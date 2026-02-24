import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export interface Testimonial {
    id: string;
    name: string;
    profession?: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage?: boolean;
}

interface GetTestimonialsParams {
    page?: number;
    limit?: number;
}

interface TestimonialState {
    testimonials: Testimonial[];
    pagination: Pagination;
    loading: boolean;
    error: string | null;
}

const initialState: TestimonialState = {
    testimonials: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: true,
    },
    loading: false,
    error: null,
};



// ✅ Get all testimonials
export const getAllTestimonials = createAsyncThunk(
    "testimonials/getAll",
    async (params: GetTestimonialsParams = {}, { rejectWithValue }) => {
        try {
            const page = params.page ?? 1;
            const limit = params.limit ?? 10;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await api({
                url: `/user/testimonials?page=${page}&limit=${limit}`,
                method: "GET",
            });

            return {
                testimonials: res.testimonials || [],
                pagination: res.pagination || {
                    page,
                    limit,
                    total: 0,
                    totalPages: 0,
                    hasNextPage: false,
                },
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message || "Failed to fetch testimonials"
            );
        }
    }
);



const testimonialSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {

        // optional reset (useful when leaving page)
        clearTestimonials: (state) => {
            state.testimonials = [];
            state.pagination = initialState.pagination;
        },

    },

    extraReducers: (builder) => {
        builder

            // Pending
            .addCase(getAllTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            // Fulfilled
            .addCase(getAllTestimonials.fulfilled, (state, action) => {
                state.loading = false;

                const { testimonials, pagination } = action.payload;

                // ✅ Append if page > 1 (infinite scroll)
                if (pagination.page > 1) {
                    state.testimonials = [
                        ...state.testimonials,
                        ...testimonials,
                    ];
                }
                // ✅ Replace if first page
                else {
                    state.testimonials = testimonials;
                }

                state.pagination = pagination;
            })


            // Rejected
            .addCase(getAllTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { clearTestimonials } = testimonialSlice.actions;

export default testimonialSlice.reducer;