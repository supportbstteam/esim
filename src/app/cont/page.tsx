
import React from 'react'

const page = () => {
    return (
        <div className="container">
            <h1 className="text-start h1 font-bold mb-4 mt-5 md:mt-12">
                Refund Policy
            </h1>
            <div className="prose max-w-none">
                <div className="space-y-8">
                    <div className="rounded-lg pb-3 border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                1. Policy Overview
                            </h3>
                        </div>
                        <div className="px-6 pb-6">
                            <p className="mb-4">
                                Digital eSIM profiles are delivered instantly after purchase. Due to their immediate nature and the fact that they provide access to telecommunications services, different refund rules apply compared to physical products.
                            </p>
                            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    Important Notice
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    This policy respects your statutory consumer rights under EU Consumer Rights Directive, UK Consumer Rights Act, and other applicable local laws. Nothing in this policy limits your mandatory legal rights.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                2. EU 14-Day Withdrawal Right
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <p>
                                Under the <strong>EU Consumer Rights Directive</strong>, you have the right to cancel your purchase within 14 days of ordering. However, this right is modified for digital content delivered immediately.
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">
                                        ✓ Withdrawal Available
                                    </h4>
                                    <ul className="text-sm pl-3 text-green-700 space-y-1 list-disc pl-5">
                                        <li data-list-item-id="e7ce34c5c647bf5e7d1169ec5ebc5997a">
                                            Before scanning the QR code
                                        </li>
                                        <li data-list-item-id="ea9e28169ac82173cde83863548350aa2">
                                            Within 14 days of purchase
                                        </li>
                                        <li data-list-item-id="e08d36be1cadced6f50acf79f68892a67">
                                            No activation has occurred
                                        </li>
                                        <li data-list-item-id="e101010f2689307b0d93a98c731db3e17">
                                            Profile not installed on device
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-semibold text-red-800 mb-2">
                                        ✗ Withdrawal Not Available
                                    </h4>
                                    <ul className="text-sm text-red-700 pl-3 space-y-1 list-disc pl-5">
                                        <li data-list-item-id="e79cdbfbcb0eac4096ad136ffc0be381c">
                                            After QR code scanning
                                        </li>
                                        <li data-list-item-id="ed14f851c137a94d0bf5f9fd5d5ade492">
                                            Once eSIM is activated
                                        </li>
                                        <li data-list-item-id="e8c10de91a6ff2c84c87267d18b113436">
                                            Service has been consumed
                                        </li>
                                        <li data-list-item-id="e70c7fc3c82d562ed6299b192dceb2490">
                                            Data usage has begun
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    Legal Basis
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Article 16(m) of the EU Consumer Rights Directive allows exclusion of withdrawal rights for digital content when performance has begun with your consent.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                3. Refund Eligibility Matrix
                            </h3>
                        </div>
                        <div className="px-6 pb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-3 font-semibold">
                                                <p>
                                                    eSIM Status
                                                </p>
                                            </th>
                                            <th className="text-left p-3 font-semibold">
                                                <p>
                                                    Timeframe
                                                </p>
                                            </th>
                                            <th className="text-left p-3 font-semibold">
                                                <p>
                                                    Refund Available?
                                                </p>
                                            </th>
                                            <th className="text-left p-3 font-semibold">
                                                <p>
                                                    Refund Amount
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b">
                                            <td className="p-3">
                                                <p>
                                                    QR not scanned
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    ≤14 days
                                                </p>
                                            </td>
                                            <td className="p-3 text-green-700 font-semibold">
                                                <p>
                                                    Yes
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    100% full refund
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3">
                                                <p>
                                                    QR scanned, not installed
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    ≤14 days
                                                </p>
                                            </td>
                                            <td className="p-3 text-yellow-700 font-semibold">
                                                <p>
                                                    Partial
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    80% (network fee deducted)
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3">
                                                <p>
                                                    eSIM activated &amp; used
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    Any time
                                                </p>
                                            </td>
                                            <td className="p-3 text-red-700 font-semibold">
                                                <p>
                                                    No
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    Service consumed
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3">
                                                <p>
                                                    Technical failure (proven)
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    Any time
                                                </p>
                                            </td>
                                            <td className="p-3 text-green-700 font-semibold">
                                                <p>
                                                    Yes
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p>
                                                    100% or free replacement
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                4. How to Request a Refund
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-6">
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="text-center p-4 border border-primary/20 rounded-lg">
                                    <div className="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-sm">1</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">
                                        Contact Support
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Email support@esimaero.com with your order ID and reason.
                                    </p>
                                </div>
                                <div className="text-center p-4 border border-primary/20 rounded-lg">
                                    <div className="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-sm">2</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">
                                        Provide Information
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Our team may request device logs or screenshots.
                                    </p>
                                </div>
                                <div className="text-center p-4 border border-primary/20 rounded-lg">
                                    <div className="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-sm">3</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">
                                        Receive Refund
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Approved refunds are processed within 5 business days.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">
                                    Required Information
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                                    <li data-list-item-id="ec53c211e44c7568bbc09311f08547710">
                                        Order ID
                                    </li>
                                    <li data-list-item-id="e1fda1e148cc192c7f6de86316006dcf2">
                                        Email address used for purchase
                                    </li>
                                    <li data-list-item-id="ecac0e78ce913ac2dccdd9238a385156e">
                                        Detailed reason for refund request
                                    </li>
                                    <li data-list-item-id="e38685a731abf07cd588af505e7e762d3">
                                        Device information (if technical issue)
                                    </li>
                                    <li data-list-item-id="eff60245467b441355197445e1ea52811">
                                        Screenshots or error messages
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border pb-3 bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                5. Technical Failure Guarantee
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <p>
                                If your eSIM fails due to a technical issue on our end, we provide a full refund or replacement regardless of activation time.
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Covered Technical Issues
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                                        <li data-list-item-id="e380355d1393cf21ea64d83727af4a6f7">
                                            eSIM profile fails to download
                                        </li>
                                        <li data-list-item-id="e59ab40fb4d365c296cd896cbd7906003">
                                            Network connectivity issues
                                        </li>
                                        <li data-list-item-id="eaa565dc3786c3a50a0402a5e41866e24">
                                            Incorrect plan configuration
                                        </li>
                                        <li data-list-item-id="ef9237fa349740ce80f1358f89a41369f">
                                            Server-side activation problems
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Not Covered
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                                        <li data-list-item-id="e31788a6b2ee55f29428ae8b304c0e2dc">
                                            Device compatibility issues
                                        </li>
                                        <li data-list-item-id="e9daa4719e72c21f2a61aa093612c7a8a">
                                            Carrier network outages
                                        </li>
                                        <li data-list-item-id="e332de0c87c6cb3fb0322e2e962bfd784">
                                            User installation errors
                                        </li>
                                        <li data-list-item-id="eacb112b30ca8f170023849b1e3ad2c30">
                                            Poor signal in certain locations
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card pb-3 text-card-foreground shadow-sm">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                6. Chargebacks &amp; Disputes
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-yellow-800 mb-2">
                                    ⚠ Important Notice
                                </h4>
                                <p className="text-sm text-yellow-700">
                                    Please contact support before initiating a chargeback.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Legitimate Chargebacks
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                                        <li data-list-item-id="e10f9c15109b0acf6f007bb96d70b7eff">
                                            Unauthorized transactions
                                        </li>
                                        <li data-list-item-id="ee5d546ecf13c8b33fcaffad57529fb4b">
                                            Fraudulent activity
                                        </li>
                                        <li data-list-item-id="ee42e40f21bbfd2b47a0be509245ad160">
                                            Technical failure unresolved
                                        </li>
                                        <li data-list-item-id="e166ec4c486b4397efd88c05aaa502fc2">
                                            Service not delivered as described
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">
                                        Chargeback Abuse
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                                        <li data-list-item-id="eb97ac7cbce1d96408c95bfdb88bdddff">
                                            Service delivered successfully
                                        </li>
                                        <li data-list-item-id="e9c74de02a654c8bae646cac785e35736">
                                            Customer used the service
                                        </li>
                                        <li data-list-item-id="e5691f6e3a8eb38230c7bbff2ef8bfe86">
                                            Refund request denied for valid reasons
                                        </li>
                                        <li data-list-item-id="ea49391041a1161db6e33ea60b4e22fb4">
                                            Attempting to get free service
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg">
                                <h4 className="font-semibold text-destructive mb-2">
                                    Chargeback Abuse Policy
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Repeated fraudulent chargebacks may result in account termination.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-10 pb-3">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold">
                                7. Local Consumer Rights
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <p>
                                This refund policy does not limit any mandatory consumer rights under your local law.
                            </p>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">
                                        EU/UK Rights
                                    </h4>
                                    <p className="text-sm text-blue-700">
                                        2-year legal guarantee for digital services.
                                    </p>
                                </div>
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">
                                        Australian Rights
                                    </h4>
                                    <p className="text-sm text-green-700">
                                        Consumer guarantees under Australian Consumer Law.
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h4 className="font-semibold text-purple-800 mb-2">
                                        US Rights
                                    </h4>
                                    <p className="text-sm text-purple-700">
                                        State-specific consumer protection laws.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
