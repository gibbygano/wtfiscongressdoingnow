import { BlueSky } from "islands";
import { Handlers } from "$fresh/server.ts";

const fetchLatest = async () => {
    return await (await fetch(
        "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=silladelphia.wtfiscongressdoingnow.us",
    )).json();
};

const fetchListItem = async (uri: string) => {
    try {
        return (await (await fetch(`https://embed.bsky.app/oembed?url=${uri}`)).json()).html;
    } catch {
        console.log("don't worry about it");
    }
};

export const handler: Handlers = {
    async GET(_req, ctx) {
        const listItems: Array<string> = [];
        const latest: { feed: Array<{ post: { uri: string } }> } = await fetchLatest();
        for await (const item of latest.feed.map(({ post }) => fetchListItem(post.uri))) {
            if (item !== undefined) {
                listItems.push(item);
            }
        }
        const resp = await ctx.render({ listItems });
        return resp;
    },
};

export default ({ data }: { data: { listItems: Array<string> } }) => (
    <BlueSky feed={data.listItems} />
);
