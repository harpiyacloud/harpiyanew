import { SocialPostFormatterMixinBase } from '@social/js/social_post_formatter_mixin';

import { patchWithCleanup } from "@web/../tests/helpers/utils";

QUnit.module('Social Formatter Regex', {}, () => {
    QUnit.test('Facebook Message', (assert) => {
        assert.expect(1);

        patchWithCleanup(SocialPostFormatterMixinBase, {
            _getMediaType() { return 'facebook' },
            _formatPost() {
                this.originalPost = { account_id: { raw_value: 42 } };
                return super._formatPost(...arguments);
            }
        });

        const testMessage = 'Hello @[542132] Harpiya-Social, check this out: https://www.harpiya.com?utm=mail&param=1 #crazydeals #harpiya';
        const finalMessage = SocialPostFormatterMixinBase._formatPost(testMessage);

        assert.equal(finalMessage, [
            "Hello",
            "<a href='/social_facebook/redirect_to_profile/42/542132?name=Harpiya-Social' target='_blank'>Harpiya-Social</a>,",
            "check this out:",
            "<a href='https://www.harpiya.com?utm=mail&amp;param=1' class='text-truncate' target='_blank' rel='noreferrer noopener'>https://www.harpiya.com?utm=mail&amp;param=1</a>",
            "<a href='https://www.facebook.com/hashtag/crazydeals' target='_blank'>#crazydeals</a>",
            "<a href='https://www.facebook.com/hashtag/harpiya' target='_blank'>#harpiya</a>",
        ].join(' '));
    });

    QUnit.test('Instagram Message', (assert) => {
        assert.expect(1);

        patchWithCleanup(SocialPostFormatterMixinBase, {
            _getMediaType() { return 'instagram' },
        });

        const testMessage = 'Hello @Harpiya.Social, check this out: https://www.harpiya.com #crazydeals #harpiya';
        const finalMessage = SocialPostFormatterMixinBase._formatPost(testMessage);

        assert.equal(finalMessage, [
            "Hello",
            "<a href='https://www.instagram.com/Harpiya.Social' target='_blank'>@Harpiya.Social</a>,",
            "check this out:",
            "<a href='https://www.harpiya.com' class='text-truncate' target='_blank' rel='noreferrer noopener'>https://www.harpiya.com</a>",
            "<a href='https://www.instagram.com/explore/tags/crazydeals' target='_blank'>#crazydeals</a>",
            "<a href='https://www.instagram.com/explore/tags/harpiya' target='_blank'>#harpiya</a>",
        ].join(' '));
    });

    QUnit.test('LinkedIn Message', (assert) => {
        assert.expect(1);

        patchWithCleanup(SocialPostFormatterMixinBase, {
            _getMediaType() { return 'linkedin' },
        });

        const testMessage = 'Hello, check this out: https://www.harpiya.com {hashtag|#|crazydeals} #harpiya';
        const finalMessage = SocialPostFormatterMixinBase._formatPost(testMessage);

        assert.equal(finalMessage, [
            "Hello, check this out:",
            "<a href='https://www.harpiya.com' class='text-truncate' target='_blank' rel='noreferrer noopener'>https://www.harpiya.com</a>",
            "<a href='https://www.linkedin.com/feed/hashtag/?keywords=crazydeals' target='_blank'>#crazydeals</a>",
            "<a href='https://www.linkedin.com/feed/hashtag/?keywords=harpiya' target='_blank'>#harpiya</a>",
        ].join(' '));
    });

    QUnit.test('Twitter Message', (assert) => {
        assert.expect(1);

        patchWithCleanup(SocialPostFormatterMixinBase, {
            _getMediaType() { return 'twitter' },
        });

        const testMessage = 'Hello @Harpiya-Social, check this out: https://www.harpiya.com #crazydeals #harpiya';
        const finalMessage = SocialPostFormatterMixinBase._formatPost(testMessage);

        assert.equal(finalMessage, [
            "Hello",
            "<a href='https://twitter.com/Harpiya-Social' target='_blank'>@Harpiya-Social</a>,",
            "check this out:",
            "<a href='https://www.harpiya.com' class='text-truncate' target='_blank' rel='noreferrer noopener'>https://www.harpiya.com</a>",
            "<a href='https://twitter.com/hashtag/crazydeals?src=hash' target='_blank'>#crazydeals</a>",
            "<a href='https://twitter.com/hashtag/harpiya?src=hash' target='_blank'>#harpiya</a>",
        ].join(' '));
    });

    QUnit.test('YouTube Message', (assert) => {
        assert.expect(1);

        patchWithCleanup(SocialPostFormatterMixinBase, {
            _getMediaType() { return 'youtube' },
        });

        const testMessage = 'Hello, check this out: https://www.harpiya.com #crazydeals #harpiya';
        const finalMessage = SocialPostFormatterMixinBase._formatPost(testMessage);

        assert.equal(finalMessage, [
            "Hello, check this out:",
            "<a href='https://www.harpiya.com' class='text-truncate' target='_blank' rel='noreferrer noopener'>https://www.harpiya.com</a>",
            "<a href='https://www.youtube.com/results?search_query=%23crazydeals' target='_blank'>#crazydeals</a>",
            "<a href='https://www.youtube.com/results?search_query=%23harpiya' target='_blank'>#harpiya</a>",
        ].join(' '));
    });
});
