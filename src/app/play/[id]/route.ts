import { createReadStream, statSync } from "fs";
import { resolve } from "path";

// TODO: implement better streaming
// TODO: current streaming not compatible with chrome
export async function GET(req: Request, route: { params: { id: string } }) {
  const filePath = resolve("uploads", route.params.id + ".mp3");
  try {
    // Get file stats to obtain the file size
    const stats = statSync(filePath);
    // Create a read stream from the file
    const stream = createReadStream(filePath);
    // Create a response object
    // @ts-ignore
    const res = new Response(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": stats.size.toString(),
      },
    });

    return res;
  } catch (error) {
    // Handle errors such as file not found, etc.
    console.error("Error:", error);
    return new Response("File not found", { status: 404 });
  }
}
