// ==UserScript==
// @name        Remove URL tracking
// @author      KokichaKolevTM
// @description Removes UTM and other tracking parameters from URLs.
// @match       http://*/*?*
// @match       https://*/*?*
// @version     3.1
// @grant       none
// @run-at      document-start
// ==/UserScript==

// Sources for tracking parameters:
// https://github.com/DandelionSprout/adfilt/blob/master/LegitimateURLShortener.txt (➗ Actually Legitimate URL Shortener Tool)
// https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_17_TrackParam/filter.txt (AdGuard URL Tracking filter)
// https://privacytests.org/ (Section "Tracking query parameter tests")
// https://github.com/jparise/chrome-utm-stripper#recognized-parameters
// https://maxchadwick.xyz/tracking-query-params-registry/
// https://github.com/brave/brave-browser/wiki/Brave-Ads:-Reserved-click-through-URL-parameters#reserved-click-through-url-parameters

if (location.search !== "") {
    const trackparams = ["_hsmi", "__hsfp", "__hstc", "__hssc", "__s", "_hsenc", "dclid", "hsCtaTracking", "igshid", "mc_eid", "mc_cid", "mkt_tok", "s_cid", "vero_conv", "wickedid", "awc", "hsa_acc", "hsa_ad", "hsa_cam", "hsa_grp", "hsa_kw", "hsa_la", "hsa_mt", "hsa_net", "hsa_ol", "hsa_src", "hsa_tgt", "hsa_ver", "ysclid", "yclid", "aiad_clid", "_sgm_campaign", "_sgm_source", "_sgm_action", "maf", "_clde", "_cldee", "wt_mc", "oprtrack", "xtor", "msclkid", "cvid", "utm_ad", "utm_affiliate", "utm_brand", "utm_campaign", "utm_campaignid", "utm_channel", "utm_cid", "utm_content", "utm_emcid", "utm_emmid", "utm_id", "utm_keyword", "utm_medium", "utm_name", "utm_place", "utm_product", "utm_pubreferrer", "utm_reader", "utm_referrer", "utm_serial", "utm_session", "utm_siteid", "utm_social", "utm_social-type", "utm_source", "utm_supplier", "utm_swu", "utm_term", "utm_umguk", "utm_userid", "utm_viz_id", "utm_team", "utm_audience", "utm_industry", "utm_creative", "utm_country", "utm_mailing", "gbraid", "wbraid", "gclsrc", "gclid", "dpg_source", "dpg_campaign", "dpg_medium", "dpg_content", "admitad_uid", "gps_adid", "unicorn_click_id", "adjust_creative", "adjust_tracker_limit", "adjust_tracker", "adjust_adgroup", "adjust_campaign", "bsft_clkid", "bsft_eid", "bsft_mid", "bsft_uid", "bsft_aaid", "bsft_ek", "mtm_campaign", "mtm_cid", "mtm_content", "mtm_group", "mtm_keyword", "mtm_medium", "mtm_placement", "mtm_source", "mtm_kwd", "pk_campaign", "pk_medium", "pk_source", "pk_cpn", "_branch_match_id", "vc_lpp", "ml_subscriber", "ml_subscriber_hash", "rb_clickid", "oly_anon_id", "oly_enc_id", "ebisAdID", "irgwc", "fbclid", "fbclic", "adfrom", "nx_source", "_zucks_suid", "cmpid", "asgtbndr", "guccounter", "guce_referrer", "guce_referrer_sig", "_openstat", "action_object_map", "action_ref_map", "action_type_map", "fb_action_ids", "fb_action_types", "fb_comment_id", "fb_ref", "fb_source", "twclid", "soc_src", "soc_trk", "pasZONE", "logTag", "ref_src", "ref_url", "afid", "WebSiteMapNodeID", "tt_content", "tt_medium", "scid", "dTribesID", "exta", "ranMID", "ranEAID", "ranSiteID", "ranPublisherID", "ranLinkID", "ranLinkTypeID", "ransiteID", "pdpClick", "LGWCODE", "lgw_code", "SRC", "coagent", "cotracking", "ectrans", "dartycid", "bbaid", "ppid", "unptid", "unp_tpcid", "pgrp", "mchn", "IPID", "draftsforfriends", "widget-ref", "taid", "eblink", "refd", "FMID", "_ga", "referringSource", "im_edp", "im_company", "source_location", "psf_variant", "es_id", "tracking_type", "tracking_user", "bxid", "cndid", "hasha", "hashb", "hashc", "ito", "c[0]", "rlz", "pcampaignid", "curator_clanid", "ext_source", "iradid", "irpid", "iradtype", "irmptype", "mp_value1", "__twitter_impression", "email_work_card", "tracking_source", "scrolla", "smtyp", "tpcc", "onetime_FromEmail", "itid", "full_trSrc", "cmpg_for_af", "afftag", "referralCode", "LSNPUBID", "traffic_type", "traffic_id", "dcmp", "clickOrigin", "clickSR", "istCompanyId", "istFeedId", "istItemId", "istBid", "CMP", "irclickid", "irclicid", "intcmp", "affiliates_ad_id", "wmlspartner", "wpa_bd", "wpa_pg_seller_id", "wpa_ref_id", "wpa_tag", "wpa_aux_info", "wpa_pos", "wpa_plmt", "wpa_aduid", "sscid", "rmmds", "act_poa", "utmid", "pjxsource", "pjxaffiliate_id", "pjxclick_id", "litb_from", "adw_src_id", "ggsub", "ggntk", "ggcid", "ggpos", "ggdev", "ggdevm", "ggplm", "ggtgt", "ftag", "custlixnkid", "akmClientCountry", "hss_channel", "mktids", "mc_tc", "ns_mchannel", "ns_source", "ns_campaign", "ns_linkname", "ns_fee", "zanpid", "wgu", "wgexpiry", "fsrc", "Referrer", "ad_pvid", "algo_pvid", "algo_expid", "btsid", "ws_ab_test", "spLa", "affTrack", "shrsl_analytics_sscid", "shrsl_analytics_sstid", "SSAID", "tblci", "wdorigin", "twitchReferral", "elqTrackId", "tctx", "ad_medium", "ads_name", "ad_type", "CAWELAID", "partition_id", "adgroup_id", "rlsatarget", "targetid", "elqCampaignId", "dc_campid", "dc_adgroupid", "adgroupid", "AFFNAME", "ACRID", "ASUBID", "ASID", "cm_sp", "cm_re", "campaignid", "mkref", "refer_code", "acampID", "pj_creativeid", "pj_publisherid", "track_campaignid", "track_adgroupid", "track_keyword", "cmt", "extcmp", "at_gd", "_gl", "gtmtrack", "vifAdCount", "vifNav", "afcode", "_source_page", "vfadid", "orig_referrer", "AgentCode", "AgencyNbr", "agentcodeweblink", "ncid", "adcid", "Osocial", "adxnnl", "adxnnlx", "ampcid", "affname", "nr_email_referer", "in_source", "srnd", "as_src", "edsacid", "elq", "elqaid", "elqat", "elqah", "elqcst", "elqcsid", "dgcid", "gws_rd", "sr_share", "Adposition", "adposition", "cvosrc", "ads_params", "recurring_goal_id", "CJPIXEL", "LSNPUBNAME", "affid", "aff_id", "affiliate_id", "affiliate_location_id", "aff_sub", "afn_sr", "cjdata", "cjeventid", "cjpixel", "click_id", "cm_soc", "o_lid", "o_sch", "o_xid", "wtExtndSource", "CAID", "FpAffiliate", "FpSub", "rfsn", "bclid", "bcpid", "bctid", "strackid", "afsrc", "lctid", "usource", "cjbatcheventid", "cjpid", "c3ch", "c3nid", "om_mmc", "trackingCode", "k_clickid", "CJURL", "affiliateCustomId", "CJAID", "CJCID", "CJPID", "CJSID", "irmpname", "REFERRAL_ID", "impradid", "impradname", "cm_type", "HACMP", "affil", "cjid", "cl_crtv", "cl_camp", "cl_pub", "cl_str", "cl_aid", "cl_vend", "cl_ch", "irsharedid", "hvarAID", "sv_affiliate_id", "sv_campaign_id", "LSNSUBSITE", "afd_number", "subacctid", "subacctname", "afflid", "fcref", "mclk", "mrnd", "maid", "mpty", "exactag_uk", "stpcjid", "LSID", "affuid", "icid2", "refclickid", "XCID", "irclid", "sp_source", "sp_medium", "sp_campaign", "ad_id", "cjReq", "mms_chref", "ir_cid", "rmtsref", "p_aid", "p_sid", "p_link", "p_tok", "_nc_vts_prog", "depth_1-utm_source", "cmp_id", "adg_id", "os_ehash", "ldtag_cl", "vero_id", "a_aid", "otracker", "otracker1", "ft_source", "ft_medium", "ref_source", "ref_medium", "ref_campaign", "spMailingID", "spUserID", "spJobID", "spReportId", "track_click", "actId", "actCampaignType", "actSource", "_branch_referrer", "aff_network", "cj_affid", "cj_affiliate", "cj_affname", "cj_cid", "cj_event", "cj_link_id", "cj_link_name", "cj_linkd", "cj_pub_sid", "cj_publisher", "cj_webid", "adj_campaign", "adj_adgroup", "adj_creative", "_vsrefdom", "ceneo_spo", "_kx", "afftrack", "atid", "cuid", "data1", "data2", "data3", "effi_id", "effi_id2", "fobs", "pubref", "sub1", "sub2", "sub3", "sub4", "sub5", "tid1", "tid2", "tid3", "tid4", "avad", "ckmc", "ckmsc", "__cn_tracker", "mktc", "cm_ven", "cm_cat", "cm_pla", "cm_ite", "cm_lm", "cm_ainfo", "CSID", "kpartnerid", "cnxclid", "sClickID", "paid", "pacid", "pa-partnerid", "2p_affiliate_id", "2p_click_token", "mktgcampaignp", "thg_ppc_campaign", "adtype", "tmad", "tmcampid", "tmplaceref", "tmclickref", "s_afcid", "n_cid", "int_cmpid", "awid", "szredirectid", "porc", "af_ad", "af_ad_id", "af_ad_type", "af_adset", "af_adset_id", "af_c_id", "af_channel", "af_click_lookback", "af_cost_model", "af_force_deeplink", "af_keyword", "af_keywords", "af_prt", "af_referral_type", "af_referrer_customer_id", "af_referrer_name", "af_referrer_uid", "af_siteid", "af_sub_siteid", "is_retargeting", "shortlink", "deep_link_sub1", "ClickThruEmail", "ClickThruCustomerNumber", "affc", "byp455", "detail_from", "sub_aff_id", "tg_ref", "dt_dapp", "dt_platform", "i_cid", "waad", "af-campaign", "_gac", "af_medium", "af_source", "af_campaign", "effect_medium", "effect_source", "effect_campaign", "aftr", "aftr_source", "ko_click_id", "rbx_source", "rbx_medium", "rbx_campaign", "a_fid", "mr%3AtrackingCode", "mr%3AreferralID", "mr%3Adevice", "mr%3AadType", "mr:trackingCode", "mr:referralID", "mr:device", "mr:adType", "mr:ad", "mr:keyword", "mr:match", "mr:tid", "mr:ploc", "mr:iloc", "mr:store", "mr:filter", "mr:adGroup", "mr:placement", "mr:ext", "nrtv_cid", "nrtv_as_src", "trk_ref", "ircid", "cf_affiliate_id", "rndad", "ad_config_id", "dfw_tracker", "amp_device_id", "awinaffid", "cje", "removedParams", "iclid", "_bta_tid", "_bta_c", "trk_contact", "trk_msg", "trk_module", "trk_sid", "gdfms", "gdftrk", "gdffi", "redirect_log_mongo_id", "redirect_mongo_id", "sb_referer_host", "mkwid", "pcrid", "ef_id", "s_kwcid", "dm_i", "epik", "pk_content", "pk_kwd", "pk_keyword", "ig_mid", "asclid", "au_advert_id", "au_car_id", "ads_adid", "ads_cmpid", "ads_creative", "ads_matchtype", "ads_network", "ads_targetid", "elqTrack", "mindbox-click-id", "dtpid", "tj", "tagtag_uid", "afCampaignId", "afCreativeId", "affiliateCode", "affcode", "ref_lp", "cx_testId", "cx_testVariant", "cx_artPos", "belboon", "channable", "int_source", "int_medium", "int_content", "int_campaign", "sudaref", "pm_source", "pm_medium", "pm_campaign", "x_tr_pto", "oref", "gaa_at", "gaa_n", "gaa_ts", "gaa_sig", "amp_gsa", "vgo_ee", "rpcid", "sap-outbound-id", "analyticsCorrelationId", "Affiliate_id", "Cvosrc", "oft_id", "oft_k", "oft_lk", "oft_d", "oft_c", "oft_ck", "oft_ids", "oft_sk", "adobe_mc", "refRID", "dchild", "creativeASIN", "trkCampaign", "coliid", "geniuslink", "hvadid", "hvpos", "hvnetw", "hvrand", "hvpone", "hvptwo", "hvqmt", "hvdev", "hvdvcmdl", "hvlocint", "hvlocphy", "hvtargid", "adgrpid", "hvbmt", "hvexid", "cstrackid", "_trkparms", "_trksid", "_from", "sacat", "_blrs", "googleloc", "rpp_cid", "hc_ref", "hc_location", "sfnsn", "acontext", "dti", "fref", "privacy_mutation_token", "settings_tracking", "_rdr", "_ft_", "m_entstream_source", "cp_ksver", "biw", "bih", "gs_lcp", "cshid", "sxsrf", "tbas", "fir", "ogbl", "share_ab_group", "u_code", "is_copy_url", "is_from_webapp", "sender_device", "sender_web_id", "share_app_id", "share_item_id", "share_link_id", "algo", "imp_id", "gtm", "scm_id", "scm", "scm-url", "tmLog", "aem_p4p_detail", "algo_exp_id", "wx_header", "wx_navbar_hidden", "wx_navbar_transparent", "ignoreNavigationBar", "wx_statusbar_hidden", "fromRankId", "aff_fcid", "aff_fsk", "aff_platform", "aff_trace_key", "spm", "tracelog", "cardId", "aff_click_id", "clickArea", "user_ip", "clicktime", "nettype", "report_recomm_player", "sm12", "adcampaigngroup", "ia-pkpmtrack", "affiliate", "trco_id", "context_referrer", "ref_ctx_id", "nosto_source", "nosto", "af_id", "affi_id", "organic_search_click", "marketing_id", "cpa-perf", "retailAttributionToken", "trafficSource", "recs_source", "rffrid", "ad_name", "pr_prod_strat", "pr_rec_pid", "pr_ref_pid", "pr_seq", "lclid", "rtkcid", "rtkcmpid", "sharedid", "usqp", "adclid", "itm_source", "itm_medium", "itm_campaign", "itm_content", "itm_term", "brave-campaign-id", "brave-creative-set-id", "brave-creative-id", "piwik_campaign", "piwik_kwd", "piwik_keyword", "matomo_campaign", "matomo_keyword", "matomo_source", "matomo_medium", "matomo_content", "matomo_cid", "matomo_group", "matomo_placement", "emag_click_id", "CJEVENT", "adgroup", "ecid", "clickid", "trackID", "erid", "cx_click", "mindbox-message-key", "smid", "LID", "itok", "mbid", "tduid", "campaign_id", "tcid", "AFID", "trackid", "lcid", "mcid", "msid", "omnisendContactID", "is_pocket", "app_clickref", "as_campaign", "as_camptype", "as_channel", "as_source", "argsite", "ctc", "ws", "pr_rec_id", "_mak_partner_campaign", "src_medium", "src_source", "src_campaign", "src_term", "src_content", "src_custom", "oicd", "mkevt", "mkcid", "mkrid", "campid", "toolid", "customid", "srsltid", "uzcid", "beyond_uzcvid", "beyond_uzmcvid", "_sgm_term", "_sgm_pinned", "ebisOther1", "ebisOther2", "ebisOther3", "ebisOther4", "ebisOther5", "bemobdata", "_bhlid", "_bdadid", "a8", "recommended_by", "recommended_code", "personaclick_search_query", "personaclick_input_query", "ems_dl", "emcs_t", "btag", "jmtyClId", "Tcsack", "vsm_type", "vsm_cid", "vsm_pid", "cjevent", "at_campaign", "at_campaign_type", "at_creation", "at_emailtype", "at_link", "at_link_id", "at_link_origin", "at_link_type", "at_medium", "at_ptr_name", "at_recipient_id", "at_recipient_list", "at_send_date", "_ope", "af_xp", "sms_click", "sms_source", "sms_uph", "ttclid", "spot_im_redirect_source", "mt_link_id", "user_email_address", "cm_me", "cm_cr", "ir_campaignid", "ir_adid", "ir_partnerid", "__io_lv", "_io_session_id", "ymid", "gci", "pk_vid", "famad_xuid", "cx_recsOrder", "cx_recsWidget", "adobe_mc_ref", "adobe_mc_sdid", "utm_adgroup", "utm_id_", "utm_servlet", "utm_source_platform", "gad_source", "adjust_referrer", "external_click_id"];
    
    const url = new URL(location.href);
    const params = url.searchParams;
    const keys = Array.from(params.keys());
    const length = trackparams.length;
    for (let i = 0; i < length; i++) {
        if (keys.includes(trackparams[i])) {
            if (keys.includes("mkt_unsubscribe") && trackparams[i] === "mkt_tok") {
                console.log("Parameter NOT removed -> " + trackparams[i]);
                continue;
            }
            params.delete(trackparams[i]);
            console.log("Removed tracking parameter -> " + trackparams[i]);
        }
    }
    if (location.href !== url.href) {
        window.stop();
        location.replace(url.href);
    }
}
