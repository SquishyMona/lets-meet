import { authWithGoogle } from "@/lib/firebase/auth"

export default function AuthForm() {
    return (
        <dialog id="authform" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <h3 className="font-bold text-lg">Sign In</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    {/* Sign in with Email */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/* Sign in with Google button*/}
                <button className="btn btn-primary w-full" onClick={authWithGoogle}>Sign in with Google</button>
            </div>
        </dialog>
    )
}