import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CampaignCreator from "../components/CampaignCreator";
import RecentSupporters from "../components/RecentSupporters";
import RelatedCampaigns from "../components/RelatedCampaigns";
import DonationModal from "../components/DonationModal";

import api from "../../../services/api";

const CampaignDetails = () => {
    const { id } = useParams();

    const [campaign, setCampaign] = useState(null);
    const [backers, setBackers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [shareMessage, setShareMessage] = useState("");

    // ==========================================
    // Fetch Campaign
    // ==========================================
    const fetchCampaign = async () => {
        try {
            const response = await api.get(
                `/projects/${id}`
            );

            setCampaign(response.data.project);
        } catch (error) {
            console.error(
                "Error fetching campaign:",
                error
            );

            setCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Fetch Backers
    // ==========================================
    const fetchBackers = async () => {
        try {
            const response = await api.get(
                `/projects/${id}/backers`
            );

            setBackers(response.data.count || 0);
        } catch (error) {
            console.error(
                "Error fetching backers:",
                error
            );

            setBackers(0);
        }
    };

    // ==========================================
    // Load Campaign Data
    // ==========================================
    useEffect(() => {
        setLoading(true);

        fetchCampaign();
        fetchBackers();
    }, [id]);

    // ==========================================
    // Share Campaign
    // ==========================================
    const handleShare = async () => {
        try {
            const shareData = {
                title:
                    campaign?.title ||
                    "CrowdApp Campaign",

                text:
                    campaign?.description ||
                    "Support this crowdfunding campaign.",

                url: window.location.href,
            };

            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }

            await navigator.clipboard.writeText(
                window.location.href
            );

            setShareMessage(
                "Campaign link copied!"
            );

            setTimeout(() => {
                setShareMessage("");
            }, 2500);
        } catch (error) {
            // User cancelling the native share dialog
            // should not be treated as an application error.
            if (error?.name === "AbortError") {
                return;
            }

            console.error(
                "Failed to share campaign:",
                error
            );

            setShareMessage(
                "Unable to share campaign."
            );

            setTimeout(() => {
                setShareMessage("");
            }, 2500);
        }
    };

    // ==========================================
    // Loading
    // ==========================================
    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

                    <h1 className="mt-5 text-xl font-semibold text-slate-700">
                        Loading campaign...
                    </h1>

                </div>
            </div>
        );
    }

    // ==========================================
    // Campaign Not Found
    // ==========================================
    if (!campaign) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Campaign Not Found
                    </h1>

                    <p className="mt-3 text-slate-500">
                        This campaign may have been removed
                        or the link is invalid.
                    </p>

                </div>
            </div>
        );
    }

    // ==========================================
    // Calculations
    // ==========================================
    const pledgedAmount =
        Number(campaign.pledgedAmount) || 0;

    const goalAmount =
        Number(campaign.goalAmount) || 0;

    const progress =
        goalAmount > 0
            ? Math.min(
                (pledgedAmount / goalAmount) * 100,
                100
            )
            : 0;

    const daysLeft = campaign.deadline
        ? Math.max(
            0,
            Math.ceil(
                (new Date(campaign.deadline) -
                    new Date()) /
                (1000 * 60 * 60 * 24)
            )
        )
        : 0;

    const imageUrl =
        typeof campaign.image === "string" &&
            campaign.image.trim() !== ""
            ? campaign.image
            : "https://placehold.co/1200x600?text=No+Image";

    const formattedGoal =
        goalAmount.toLocaleString("en-IN");

    const formattedRaised =
        pledgedAmount.toLocaleString("en-IN");

    return (
        <section className="bg-slate-50 py-16">

            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">

                {/* ==========================================
                    LEFT SECTION
                ========================================== */}
                <div className="lg:col-span-2">

                    {/* Campaign Image */}
                    <img
                        src={imageUrl}
                        alt={
                            campaign.title ||
                            "Campaign"
                        }
                        className="h-[380px] w-full rounded-3xl object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "https://placehold.co/1200x600?text=No+Image";
                        }}
                    />

                    {/* Category */}
                    <span className="mt-8 inline-block rounded-full bg-indigo-100 px-4 py-2 text-indigo-600">
                        {campaign.category ||
                            "Uncategorized"}
                    </span>

                    {/* Title */}
                    <h1 className="mt-6 text-5xl font-bold text-slate-900">
                        {campaign.title}
                    </h1>

                    {/* Short Description */}
                    {campaign.description && (
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            {campaign.description}
                        </p>
                    )}

                    {/* ==========================================
                        About Campaign
                    ========================================== */}
                    <div className="mt-12">

                        <h2 className="text-3xl font-bold text-slate-900">
                            About This Campaign
                        </h2>

                        <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">
                            {campaign.description ||
                                "No description has been provided for this campaign."}
                        </p>

                    </div>

                    {/* ==========================================
                        Campaign Stats
                    ========================================== */}
                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        {/* Goal */}
                        <div className="rounded-2xl bg-white p-6 shadow-md">

                            <h3 className="text-sm text-slate-500">
                                Goal
                            </h3>

                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                ₹{formattedGoal}
                            </p>

                        </div>

                        {/* Raised */}
                        <div className="rounded-2xl bg-white p-6 shadow-md">

                            <h3 className="text-sm text-slate-500">
                                Raised
                            </h3>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                ₹{formattedRaised}
                            </p>

                        </div>

                        {/* Backers */}
                        <div className="rounded-2xl bg-white p-6 shadow-md">

                            <h3 className="text-sm text-slate-500">
                                Backers
                            </h3>

                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {backers}
                            </p>

                        </div>

                    </div>

                </div>

                {/* ==========================================
                    RIGHT SECTION
                ========================================== */}
                <div>

                    <div className="sticky top-24 space-y-6">

                        {/* ==========================================
                            Donation Card
                        ========================================== */}
                        <div className="rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">

                            {/* Status */}
                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${campaign.status ===
                                        "Active"
                                        ? "bg-green-100 text-green-700"
                                        : campaign.status ===
                                            "Funded"
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "bg-slate-100 text-slate-700"
                                    }`}
                            >
                                {campaign.status ||
                                    "Unknown"}
                            </span>

                            {/* Raised Amount */}
                            <h2 className="mt-6 text-4xl font-bold text-slate-900">
                                ₹{formattedRaised}
                            </h2>

                            <p className="mt-2 text-slate-500">
                                raised of{" "}
                                <span className="font-semibold text-slate-800">
                                    ₹{formattedGoal}
                                </span>
                            </p>

                            {/* ==========================================
                                Progress
                            ========================================== */}
                            <div className="mt-8">

                                <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        {Math.round(
                                            progress
                                        )}
                                        %
                                    </span>

                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-700"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>

                            </div>

                            {/* ==========================================
                                Stats
                            ========================================== */}
                            <div className="mt-8 grid grid-cols-2 gap-4">

                                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {backers}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Backers
                                    </p>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 text-center">

                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {daysLeft}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Days Left
                                    </p>

                                </div>

                            </div>

                            {/* ==========================================
                                Donate Button
                            ========================================== */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowDonationModal(
                                        true
                                    )
                                }
                                disabled={
                                    campaign.status !==
                                    "Active"
                                }
                                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {campaign.status ===
                                    "Active"
                                    ? "Donate Now"
                                    : "Campaign Closed"}
                            </button>

                            {/* ==========================================
                                Share Button
                            ========================================== */}
                            <button
                                type="button"
                                onClick={handleShare}
                                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white py-4 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100"
                            >
                                Share Campaign
                            </button>

                            {shareMessage && (
                                <p className="mt-3 text-center text-sm font-medium text-green-600">
                                    {shareMessage}
                                </p>
                            )}

                        </div>

                        {/* ==========================================
                            Campaign Creator
                        ========================================== */}
                        <CampaignCreator
                            creator={campaign.creator}
                            campaign={campaign}
                        />

                        {/* ==========================================
                            Recent Supporters
                        ========================================== */}
                        <RecentSupporters
                            campaignId={
                                campaign._id
                            }
                        />

                    </div>

                </div>

            </div>

            {/* ==========================================
                Related Campaigns
            ========================================== */}
            <div className="mx-auto max-w-7xl px-6">

                <RelatedCampaigns
                    campaignId={campaign._id}
                    category={campaign.category}
                />

            </div>

            {/* ==========================================
                Donation Modal
            ========================================== */}
            {showDonationModal && (
                <DonationModal
                    campaignId={campaign._id}
                    onClose={() =>
                        setShowDonationModal(false)
                    }
                    onSuccess={async () => {
                        await Promise.all([
                            fetchCampaign(),
                            fetchBackers(),
                        ]);

                        setShowDonationModal(false);
                    }}
                />
            )}

        </section>
    );
};

export default CampaignDetails;