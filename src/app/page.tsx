import { SongsDisplay } from "@/components/SongsDisplay";
import UploadForm from "@/components/forms/uploadForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full mt-20">
      <div className="m-auto flex justify-between w-2/3">
        <h1 className="text-2xl">Your songs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">Upload new song</DialogTitle>
              <DialogDescription asChild>
                <UploadForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <SongsDisplay />
    </main>
  );
}
