import { NextResponse } from "next/server";
const HF_TOKEN = process.env.HF_TOKEN;
export async function POST(req) {
  try {
    console.log("server side req recevied", req);
    const { prompt } = await req.json();
    console.log("server side prompt recevied", prompt);

 const response = await fetch(
    "https://router.huggingface.co/novita/v3/openai/chat/completions",
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            provider: "novita",
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                {
                    role: "user",
                    content: "How many 'G's in 'huggingface'?",
                },
            ],
        }),
    }
);

    // const contentType = response.headers.get("content-type");

    // if (contentType?.includes("application/json")) {
    //   const errorJSON = await response.json();
    //   console.error("HF API returned JSON error:", errorJSON);
    //   return NextResponse.json(
    //     { error: errorJSON.error || "Model failed to generate image" },
    //     { status: 500 }
    //   );
    // }

    // if (contentType?.includes("text")) {
    //   const errorText = await response.text();
    //   console.error("HF API returned text error:", errorText);
    //   return NextResponse.json({ error: errorText }, { status: 500 });
    // }

    // const arrayBuffer = await response.arrayBuffer();
    // const base64Image = Buffer.from(arrayBuffer).toString("base64");
    return NextResponse.json(await response.json());
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
