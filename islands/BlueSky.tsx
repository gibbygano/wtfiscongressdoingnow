export default ({ feed }: { feed: Array<string> }) => {
    return (
        <div class="2xl:columns-3 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10">
            {feed.map((postCode) => (
                <object
                    data={`https://embed.bsky.app/embed/did:plc:ru4uwws7zdxrncwr2a4jhask/app.bsky.feed.post/${postCode}`}
                    height="600"
                    width="900"
                >
                </object>
            ))}
            <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
        </div>
    );
};
