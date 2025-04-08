import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="mt-3 text-gray-600">Sign in to access your dashboard</p>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <Link href="/login" className="w-full">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
