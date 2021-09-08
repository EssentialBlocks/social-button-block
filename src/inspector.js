/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { useEffect } = wp.element;
const { select } = wp.data;
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	BaseControl,
	TabPanel,
	Button,
	ButtonGroup,
} = wp.components;

/**
 * Internal dependencies
 */

import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import ResponsiveRangeController from "../util/responsive-range-control";
import ColorControl from "../util/color-control";
import BorderShadowControl from "../util/border-shadow-control";
import BackgroundControl from "../util/background-control";
import DealSocialProfiles from "../util/social-profiles-v2/DealSocialProfiles";
import IconList from "../util/faIcons";
import ResetControl from "../util/reset-control";

import {
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "../util/helpers";

import objAttributes from "./attributes";

import {
	rangeIconSize,
	rangeIconPadding,
	rangeIconDistance,
	rangeIconRowGap,
	sclDeviderPosRight,
} from "./constants/rangeNames";

import {
	tmbWrapMarginConst,
	tmbWrapPaddingConst,
} from "./constants/dimensionsConstants";

import { WrpBgConst, } from "./constants/backgroundsConstants";

import {
	WrpBdShadowConst,
	prefixSocialBdShadow,
} from "./constants/borderShadowConstants";

import { IconsHzAligns, HOVER_EFFECT, ICON_SHAPE } from "./constants";

function Inspector({ attributes, setAttributes }) {
	const {
		resOption,
		socialDetails,

		//
		iconsJustify,

		//
		isIconsDevider,
		icnsDevideColor,
		icnSepW,
		icnSepH,

		//
		hvIcnColor,
		hvIcnBgc,

		//
		icnEffect,
		iconShape,

		//
		textShadowColor,
		textHOffset,
		textVOffset,
		blurRadius,
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	useEffect(() => {
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	const onShapeChange = (value) => {
		switch (value) {
			case "rounded":
				setAttributes({
					iconShape: value,
					sclBdSd_Rds_Bottom: "10",
					sclBdSd_Rds_Left: "10",
					sclBdSd_Rds_Right: "10",
					sclBdSd_Rds_Top: "10",
					sclBdSd_Rds_Unit: "px",
					sclBdSd_Rds_isLinked: true,
				});
				break;

			case "circular":
				setAttributes({
					iconShape: value,
					sclBdSd_Rds_Bottom: "50",
					sclBdSd_Rds_Left: "50",
					sclBdSd_Rds_Right: "50",
					sclBdSd_Rds_Top: "50",
					sclBdSd_Rds_Unit: "%",
					sclBdSd_Rds_isLinked: true,
				});
				break;

			case "square":
				setAttributes({
					iconShape: value,
					sclBdSd_Rds_Bottom: undefined,
					sclBdSd_Rds_Left: undefined,
					sclBdSd_Rds_Right: undefined,
					sclBdSd_Rds_Top: undefined,
					sclBdSd_Rds_Unit: "px",
					sclBdSd_Rds_isLinked: true,
				});
				break;

			default:
				break;
		}
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					// onSelect={onSelect}
					tabs={[
						{
							name: "general",
							title: "General",
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: "Styles",
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: "Advance",
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody
										title={__("Social Profiles")}
										// initialOpen={false}
									>
										<>
											<DealSocialProfiles
												profiles={socialDetails}
												onProfileAdd={(socialDetails) =>
													setAttributes({ socialDetails })
												}
												iconList={IconList}
											/>
										</>
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody
										title={__("Icons Styles")}
										// initialOpen={false}
									>
										<BaseControl label={__("Icon Shape")}>
											<ButtonGroup>
												{ICON_SHAPE.map((item) => (
													<Button
														// style={{ zIndex: 0 }} // ? Add this style to fix icon list and primary button issue
														isLarge
														isSecondary={iconShape !== item.value}
														isPrimary={iconShape === item.value}
														onClick={() => onShapeChange(item.value)}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>

										<BaseControl
											id="eb-team-icons-alignments"
											label="Social Icons Horizontal Alignments"
										>
											<SelectControl
												// label={__("Icons Horizontal Alignment")}
												value={iconsJustify}
												options={IconsHzAligns}
												onChange={(iconsJustify) =>
													setAttributes({ iconsJustify })
												}
											/>
										</BaseControl>

										<ResponsiveRangeController
											noUnits
											baseLabel={__("Size")}
											controlName={rangeIconSize}
											resRequiredProps={resRequiredProps}
											min={5}
											max={300}
											step={1}
										/>

										<ResponsiveRangeController
											noUnits
											baseLabel={__("Padding")}
											controlName={rangeIconPadding}
											resRequiredProps={resRequiredProps}
											min={0}
											max={6}
											step={0.1}
										/>

										<ResponsiveRangeController
											noUnits
											baseLabel={__("Spacing")}
											controlName={rangeIconDistance}
											resRequiredProps={resRequiredProps}
											min={0}
											max={100}
											step={1}
										/>

										<ResponsiveRangeController
											noUnits
											baseLabel={__("Rows Gap")}
											controlName={rangeIconRowGap}
											resRequiredProps={resRequiredProps}
											min={0}
											max={100}
											step={1}
										/>

										<label
											style={{
												display: "block",
												margin: "-20px 0 20px",
											}}
										>
											<i>
												N.B. 'Rows Gap' is used when U have multiple rows of
												social profiles. Normally in case of only one row, it's
												not needed
											</i>
										</label>

										<ToggleControl
											label={__("Icons Devider")}
											checked={isIconsDevider}
											onChange={() =>
												setAttributes({
													isIconsDevider: !isIconsDevider,
												})
											}
										/>

										{isIconsDevider && (
											<>
												<ColorControl
													label={__("Color")}
													color={icnsDevideColor}
													onChange={(icnsDevideColor) =>
														setAttributes({ icnsDevideColor })
													}
												/>

												<RangeControl
													label={__("Width")}
													value={icnSepW}
													onChange={(icnSepW) => setAttributes({ icnSepW })}
													step={1}
													min={1}
													max={50}
												/>

												<RangeControl
													label={__("Height")}
													value={icnSepH}
													onChange={(icnSepH) => setAttributes({ icnSepH })}
													step={1}
													min={1}
													max={50}
												/>

												<ResponsiveRangeController
													baseLabel={__("Position From Right")}
													controlName={sclDeviderPosRight}
													resRequiredProps={resRequiredProps}
													min={0}
													max={80}
													step={1}
												/>
											</>
										)}

										<ColorControl
											label={__("Hover Color")}
											color={hvIcnColor}
											onChange={(hvIcnColor) => setAttributes({ hvIcnColor })}
										/>

										<ColorControl
											label={__("Hover Background")}
											color={hvIcnBgc}
											onChange={(hvIcnBgc) => setAttributes({ hvIcnBgc })}
										/>

										<SelectControl
											label={__("Icon Hover Effect")}
											value={icnEffect}
											options={HOVER_EFFECT}
											// onChange={(preset) => setAttributes({ preset })}
											onChange={(icnEffect) => {
												setAttributes({ icnEffect });
											}}
										/>
									</PanelBody>

									<PanelBody
										title={__("Icons Border & Box-Shadow")}
										initialOpen={false}
									>
										<BorderShadowControl
											controlName={prefixSocialBdShadow}
											resRequiredProps={resRequiredProps}
											// noShadow
											// noBorder
										/>
									</PanelBody>
									<PanelBody title={__("Icons Text Shadow")} initialOpen={false}>
										<ColorControl
											label={__("Shadow Color")}
											color={textShadowColor}
											onChange={(textShadowColor) =>
												setAttributes({ textShadowColor })
											}
										/>

										<ResetControl
											onReset={() => setAttributes({ textHOffset: undefined })}
										>
											<RangeControl
												label={__("Horizontal Offset")}
												value={textHOffset}
												onChange={(newValue) =>
													setAttributes({ textHOffset: newValue })
												}
												min={0}
												max={100}
											/>
										</ResetControl>

										<ResetControl
											onReset={() => setAttributes({ textVOffset: undefined })}
										>
											<RangeControl
												label={__("Vertical Offset")}
												value={textVOffset}
												onChange={(newValue) =>
													setAttributes({ textVOffset: newValue })
												}
												min={0}
												max={100}
											/>
										</ResetControl>

										<ResetControl
											onReset={() => setAttributes({ blurRadius: undefined })}
										>
											<RangeControl
												label={__("Blur Radius")}
												value={blurRadius}
												onChange={(newValue) =>
													setAttributes({ blurRadius: newValue })
												}
												min={0}
												max={100}
											/>
										</ResetControl>
									</PanelBody>
								</>
							)}
							{tab.name === "advance" && (
								<>
									<PanelBody
										title={__("Margin & Padding")}
										// initialOpen={true}
									>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={tmbWrapMarginConst}
											baseLabel="Margin"
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={tmbWrapPaddingConst}
											baseLabel="Padding"
										/>
									</PanelBody>

									<PanelBody title={__("Background ")} initialOpen={false}>
										<BackgroundControl
											controlName={WrpBgConst}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>

									<PanelBody title={__("Border & Shadow")} initialOpen={false}>
										<BorderShadowControl
											controlName={WrpBdShadowConst}
											resRequiredProps={resRequiredProps}
											// noShadow
											// noBorder
										/>
									</PanelBody>
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
}
export default Inspector;
