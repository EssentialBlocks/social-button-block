/**
 * WordPress depencencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { SocialIcon } from "../util/icons";
import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import "./style.scss";

import example from "./example";

import metadata from "../block.json";

const { name, category } = metadata;

registerBlockType(name, {
	title: __("Social", "essential-blocks"),
	// description: __(
	// 	"Enable one-click social sharing option to grow your audience"
	// ),
	icon: SocialIcon,
	category,
	attributes,
	keywords: [
		__("social", "essential-blocks"),
		__("share", "essential-blocks"),
		__("eb essential", "essential-blocks"),
	],
	edit: Edit,
	save: Save,
	supports: {
		align: true,
	},
	example,
});
