import { createUploadthing, type FileRouter } from "uploadthing/next";
// @ts-ignore-next-line
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from '../../../db/index';
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const {getUser} = await getKindeServerSession()
      const user = await getUser()

      if(!user || !user.id) throw new Error("Unauthorized");
  
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING"
        }
      })
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;