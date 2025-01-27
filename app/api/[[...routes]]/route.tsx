/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { pinata } from "frog/hubs";
import { handle } from "frog/next";

const app = new Frog({
  basePath: "/api",
  hub: pinata(),
  title: "My First Frog App",
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge';

app.frame("/", (c) => {
  return c.res({
    action: "/picker",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/dogs.png`,
    intents: [<Button value="A">A</Button>, <Button value="B">B</Button>],
  });
});

app.frame("/picker", (c) => {
  const { buttonValue } = c;

  if (buttonValue === "A") {
    return c.res({
      action: "/meme/a",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a`,
      intents: [
        <TextInput placeholder="Text" />,
        <Button value="generate">Generate</Button>,
      ],
    });
  }

  return c.res({
    action: "/meme/b",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b`,
    imageAspectRatio: "1:1",
    intents: [
      <TextInput placeholder="Text" />,
      <Button value="generate">Generate</Button>,
    ],
  });
});

app.frame("/meme/:id", (c) => {
  const id = c.req.param("id");
  const { inputText = "" } = c;

  const newSearchParams = new URLSearchParams({
    text: inputText,
  });

  return c.res({
    action: "/",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/${id}?${newSearchParams}`,
    imageAspectRatio: id === "b" ? "1:1" : undefined,
    intents: [<Button>Start Over</Button>],
  });
});

// Enable devtools for local debugging
devtools(app, { assetsPath: "/.frog" });

export const GET = handle(app);
export const POST = handle(app);

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
