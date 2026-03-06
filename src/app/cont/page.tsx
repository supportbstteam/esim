import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page

{/* <div class="p-4 container">
    <h1 class="text-start h1 font-bold mb-4 mt-5 md:mt-12">
        Troubleshooting
    </h1>
    <div class="prose max-w-none">
        <div class="space-y-8">
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        1. Quick Checklist (Try these first)
                    </h3>
                    <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div class="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                            <div class="text-[var(--brand-green)] mt-0.5">
                                ✓
                            </div>
                            <div>
                                <p class="font-semibold">
                                    Device compatibility
                                </p>
                                <p class="text-sm">
                                    Make sure your device supports eSIM and the OS version is up to date.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                            <div class="text-[var(--brand-green)] mt-0.5">
                                ✓
                            </div>
                            <div>
                                <p class="font-semibold">
                                    QR code scanning
                                </p>
                                <p class="text-sm">
                                    Scan from the original order email/screen; avoid screenshots with glare.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                            <div class="text-[var(--brand-green)] mt-0.5">
                                ✓
                            </div>
                            <div>
                                <p class="font-semibold">
                                    Enable eSIM &amp; data
                                </p>
                                <p class="text-sm">
                                    Turn on mobile data and set the eSIM profile as the active data plan.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                            <div class="text-[var(--brand-green)] mt-0.5">
                                ✓
                            </div>
                            <div>
                                <p class="font-semibold">
                                    Restart device
                                </p>
                                <p class="text-sm">
                                    Often resolves activation and network registration issues.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        2. Common Issues &amp; Fast Fix
                    </h3>
                    <div class="mt-4 space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    QR code won't scan
                                </h4>
                                <p class="text-sm mb-2">
                                    Try opening the QR on another device or view the QR on a brighter screen. If scanning still fails, use the manual activation code (if provided) or request the QR be re-sent.
                                </p>
                                <p class="text-xs">
                                    Tip: Avoid zooming the email screenshot; instead open the original image file.
                                </p>
                            </div>
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    No network / not registering
                                </h4>
                                <p class="text-sm mb-2">
                                    Check the eSIM profile is enabled, data roaming (if required) is on, and the profile is selected for data. Try toggling airplane mode and restarting.
                                </p>
                                <p class="text-xs">
                                    If still no service, switch network selection to automatic in Settings → Mobile Networks.
                                </p>
                            </div>
                        </div>
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    Slow or unstable data
                                </h4>
                                <p class="text-sm mb-2">
                                    Run a speed test and compare results. If speeds are low, check APN settings, congestion in local area, or try a different network mode (4G/3G).
                                </p>
                                <p class="text-xs">
                                    We can check network logs if you contact support.
                                </p>
                            </div>
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    Activation error codes
                                </h4>
                                <p class="text-sm mb-2">
                                    Take a screenshot of the exact error code and message. Many activation errors are transient — we may re-provision your profile or provide a new QR.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        3. Diagnostic Matrix
                    </h3>
                    <div class="mt-4 overflow-x-auto">
                        <table class="w-full min-w-[720px] border-collapse text-sm">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left p-3 font-semibold">
                                        <p>
                                            Symptom
                                        </p>
                                    </th>
                                    <th class="text-left p-3 font-semibold">
                                        <p>
                                            Likely Cause
                                        </p>
                                    </th>
                                    <th class="text-left p-3 font-semibold">
                                        <p>
                                            Immediate Action
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p>
                                            QR won't scan
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Blurry/low-contrast image or damaged QR
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Open QR on original device; request resend; try manual code
                                        </p>
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p>
                                            Profile installs but no data
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Not selected as data plan; APN missing; roaming off
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Select profile for data, check APN, enable roaming
                                        </p>
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p>
                                            Activation fails with code
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Server provisioning issue or mismatched IMEI
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Capture error, send to support for reprovisioning
                                        </p>
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p>
                                            Intermittent connectivity
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Weak local signal, network handovers
                                        </p>
                                    </td>
                                    <td class="p-3">
                                        <p>
                                            Move to open area, test different network mode (4G/3G)
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        4. Device-specific Steps
                    </h3>
                    <div class="mt-4 grid gap-4 md:grid-cols-2">
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-semibold mb-2">
                                Apple iPhone (iOS)
                            </h4>
                            <ol class="list-decimal pl-5 space-y-2 text-sm">
                                <li data-list-item-id="e7b3b9921e47881e65db528d15124e98f">
                                    Open Camera and scan the QR code or go to Settings → Cellular → Add eSIM.
                                </li>
                                <li data-list-item-id="e7dc79969902f206b369730ac6cde3896">
                                    Follow the on-screen prompts and name the plan (Primary/Travel etc.).
                                </li>
                                <li data-list-item-id="e3cabbc8b8e5093ff42e8df32cf591ba6">
                                    Ensure Cellular Data is enabled for the eSIM and that the plan is active.
                                </li>
                                <li data-list-item-id="ee5bdc424d745597ab47c4ff30c305666">
                                    If activation hangs, restart the device and re-check Settings → Cellular → eSIM details.
                                </li>
                                <li data-list-item-id="e256d47e52c7736ecba0bea585a36af72">
                                    For dual-SIM: ensure the correct plan is set for Mobile Data and Data Roaming if required.
                                </li>
                            </ol>
                        </div>
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-semibold mb-2">
                                Android (Samsung, Pixel, Others)
                            </h4>
                            <ol class="list-decimal pl-5 space-y-2 text-sm">
                                <li data-list-item-id="ee50619db47b184b73a4567721445018f">
                                    Settings → Network &amp; Internet → Mobile Network → + Add operator → Enter activation code / scan QR.
                                </li>
                                <li data-list-item-id="ef3ab5f1d51e6d54e04cf0c7696189966">
                                    After installation, set the eSIM as the active data SIM if needed.
                                </li>
                                <li data-list-item-id="e15a5c6c8f056a8579cd5e25433e8747f">
                                    Check SIM status under Mobile Network and enable Data Roaming if travelling.
                                </li>
                                <li data-list-item-id="e73c05348d5e2f0d26f75be52e5220b6b">
                                    Some manufacturers require a device restart after installation — try that if registration fails.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div class="mt-4 grid gap-4 md:grid-cols-2">
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-semibold mb-2">
                                Wearables &amp; IoT
                            </h4>
                            <p class="text-sm">
                                Many IoT/wearable devices require carrier provisioning or specific APN values. Contact support with the device model and firmware version for special instructions.
                            </p>
                        </div>
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-semibold mb-2">
                                Windows / macOS (if supported)
                            </h4>
                            <p class="text-sm">
                                Some laptops support eSIM (e.g., recent Windows laptops). Use the OS Mobile Settings to add a cellular plan and follow vendor-specific guides.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        5. Advanced Diagnostics &amp; What to Send Support
                    </h3>
                    <div class="mt-4 space-y-4">
                        <p class="text-sm">
                            If the quick steps don't resolve the issue, gather the following information before contacting support — it speeds up diagnosis and resolution.
                        </p>
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    Essential info to collect
                                </h4>
                                <ul class="list-disc pl-5 text-sm space-y-1">
                                    <li data-list-item-id="e0c3e43f1bad0116eaf3a1eb85ad0296b">
                                        Order ID / Purchase email
                                    </li>
                                    <li data-list-item-id="e970cab4a724445c275efa4dc1c908119">
                                        Device model &amp; OS version
                                    </li>
                                    <li data-list-item-id="e87f4fd4e60ab1edd3a09736b12504bb4">
                                        Exact error message or activation code
                                    </li>
                                    <li data-list-item-id="ef5a620b44288739225d81f74966dad14">
                                        Screenshots of QR, error screens, and mobile settings
                                    </li>
                                </ul>
                            </div>
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-semibold mb-2">
                                    Optional advanced logs
                                </h4>
                                <ul class="list-disc pl-5 text-sm space-y-1">
                                    <li data-list-item-id="e33fe075559333ba5c63653bf570303b6">
                                        Carrier registration logs (if available)
                                    </li>
                                    <li data-list-item-id="e7a4f173b507469fd28f5c7680274d2d5">
                                        APN settings screenshot
                                    </li>
                                    <li data-list-item-id="e29298fea7af1258080c1974d1cde6650">
                                        Time and location of activation attempt
                                    </li>
                                    <li data-list-item-id="eb9a03e4ad753c6cb75923f69adf04935">
                                        Speedtest results (link or screenshot)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-white text-slate-900 shadow-sm mb-10">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold">
                        6. Troubleshooting Flow (step-by-step)
                    </h3>
                    <div class="mt-4 grid gap-4 md:grid-cols-3">
                        <div class="text-center p-4 border rounded-lg">
                            <div class="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-semibold">
                                1
                            </div>
                            <h4 class="font-semibold mb-2">
                                Verify QR &amp; Purchase
                            </h4>
                            <p class="text-sm">
                                Confirm order ID and QR are correct and from our domain/email.
                            </p>
                        </div>
                        <div class="text-center p-4 border rounded-lg">
                            <div class="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-semibold">
                                2
                            </div>
                            <h4 class="font-semibold mb-2">
                                Install &amp; Enable
                            </h4>
                            <p class="text-sm">
                                Install profile, select for data, and enable roaming if necessary.
                            </p>
                        </div>
                        <div class="text-center p-4 border rounded-lg">
                            <div class="w-8 h-8 bg-[#133365] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-semibold">
                                3
                            </div>
                            <h4 class="font-semibold mb-2">
                                Test &amp; Report
                            </h4>
                            <p class="text-sm">
                                Run speed test, capture errors, then contact support with collected info.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}