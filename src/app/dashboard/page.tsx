import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { UserProfile } from "@/components/user-profile"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <p className="mb-6">Welcome to your protected dashboard!</p>

      <UserProfile user={data.user} />
    </div>
  )
}
