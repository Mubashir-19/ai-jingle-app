import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 p-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Access JingleBox
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in or create an account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email (handled by Auth0)</Label>
            <Input id="email" type="email" placeholder="you@example.com" disabled />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password (handled by Auth0)</Label>
              <Link href="/api/auth/login" className="text-sm text-primary/80 hover:text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity text-primary-foreground" asChild>
            <Link href="/api/auth/login">
              Sign In / Sign Up
            </Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Login and account management are handled by Auth0.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
