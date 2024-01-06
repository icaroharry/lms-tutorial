import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  console.log("auth", auth());
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadError((err) => {
      console.log("err", err);
    })
    .onUploadComplete(() => {
      console.log("asdasdasd");
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
