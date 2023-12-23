import { createUploadthing, type FileRouter } from "uploadthing/next";
// @ts-ignore-next-line
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
  pdfUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const {getUser} = await getKindeServerSession()
      const user = await getUser()

      if(!user || !user.id) throw new Error("Unauthorized");
  
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;