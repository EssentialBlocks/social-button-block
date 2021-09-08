const { useBlockProps } = wp.blockEditor;

import SocialLinks from "./components/social-links";

export default function Save({ attributes }) {
	const { blockId, profilesOnly = [], icnEffect } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className={`${blockId} eb-social-links-wrapper`}>
				<SocialLinks profilesOnly={profilesOnly} icnEffect={icnEffect} />
			</div>
		</div>
	);
}
