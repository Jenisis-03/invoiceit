import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="mb-5 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            A Varification Link has been Sent To your Email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50 border-yellow-600 p-5">
            <div className="flex items-center">
              <AlertCircle className="size-5 text-yellow-400" />
              <p className="text-sm font-medium text-yellow-800 ml-4">
                Be Sure To Check Your Spam Folder !
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/" className={buttonVariants({ className: "w-full", variant: "secondary" })}>
            <ArrowLeft className="size-4 mr-2" />
            Back To Homepage 
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
