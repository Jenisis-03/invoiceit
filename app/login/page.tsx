import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter Your Email Address</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formdata) => {
                "use server";
                await signIn("nodemailer", formdata);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-3">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="enter your email Address"
                />
              </div>
              <SubmitButton text="login" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
