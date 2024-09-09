import { BlueSky } from "islands";
import { Handlers } from "$fresh/server.ts";

const fetchLatest = async () => {
    return await (await fetch(
        "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=silladelphia.wtfiscongressdoingnow.us",
    )).json();
};

export const handler: Handlers = {
    async GET(_req, ctx) {
        const latest: { feed: Array<{ post: { uri: string } }> } = await fetchLatest();

        const postCodes = latest.feed.map(({ post }) =>
            post.uri.replace("at://did:plc:ru4uwws7zdxrncwr2a4jhask/app.bsky.feed.post/", "")
        );

        const resp = await ctx.render({ postCodes });
        return resp;
    },
};

export default ({ data }: { data: { postCodes: Array<string> } }) => (
    <BlueSky feed={data.postCodes} />
);
