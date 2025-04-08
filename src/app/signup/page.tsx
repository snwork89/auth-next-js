import { SignUpForm } from "@/components/signup-form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div>
        <SignUpForm />
      </div>
    </div>
  )
}
