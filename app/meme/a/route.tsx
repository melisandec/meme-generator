import { ImageResponse } from "next/og";
// App router includes @vercel/og
// No need to install

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const hasText = searchParams.has("text");
  const text = hasText ? searchParams.get("text")?.slice(0, 100) : "";

  const imageData = await fetch(new URL("./a.png", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          fontFamily: "Inter",
          fontSize: "2em",
          color: "black",
          background: "#f6f6f6",
        }}
      >
        <img
          width="1200"
          height="630"
          alt="meme"
          src={imageData as unknown as string}
        />
        <p
          style={{
            position: "absolute",
            margin: 0,
            paddingBottom: 20,
            lineHeight: 1,
            color: "#ffffff",
            fontSize: 100,
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: "5px 5px 3px #000000, -5px 5px 0px #000000 ",
          }}
        >
          {text}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
