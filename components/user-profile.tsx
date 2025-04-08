"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)

    try {
      await fetch("/logout", { method: "POST" })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">User ID</p>
          <p className="text-sm text-muted-foreground">{user.id}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Last Sign In</p>
          <p className="text-sm text-muted-foreground">
            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"}
          </p>
        </div>

        <Button variant="destructive" onClick={handleSignOut} disabled={loading} className="mt-4">
          <LogOut className="mr-2 h-4 w-4" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </CardContent>
    </Card>
  )
}
