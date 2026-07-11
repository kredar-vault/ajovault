"use client";

import React from "react";
import { Mail, MessageSquare, Link2, MessageCircle } from "lucide-react";
import { useGroupOnboarding } from "@/hooks/useGroupOnboarding";

interface InviteShareChannelsProps {
  groupId: string;
  groupName: string;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export function InviteShareChannels({ groupId, groupName, setStatusMessage }: InviteShareChannelsProps) {
  const { sendIndividualInvite, generateInviteLink } = useGroupOnboarding();

  const handleShareClick = async (id: string) => {
    setStatusMessage(null);
    
    try {
      if (id === "email") {
        const email = prompt("Enter your friend's email address:");
        if (!email) return;
        await sendIndividualInvite(groupId, { type: "email", value: email });
        setStatusMessage(`Successfully sent an invitation to ${email}!`);
      } 
      
      else if (id === "phone") {
        const phone = prompt("Enter your friend's phone number:");
        if (!phone) return;
        await sendIndividualInvite(groupId, { type: "phone", value: phone });
        setStatusMessage(`Successfully sent SMS text message to ${phone}!`);
      } 
      
      else if (id === "link") {
        const sharedLink = await generateInviteLink(groupId);
        await navigator.clipboard.writeText(sharedLink);
        setStatusMessage("Invitation URL link copied to clipboard!");
      } 
      
      else if (id === "whatsapp") {
        const sharedLink = await generateInviteLink(groupId);
        const textMessage = `Join our savings rotation circle "${groupName}" on Ajo Vault! Here is the invite link: ${sharedLink}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`, "_blank");
      }
    } catch (err) {
      setStatusMessage("Could not process invitation action. Please try again.");
    }
  };

  const shareOptions = [
    {
      id: "email",
      title: "Email Address",
      desc: "Send a direct invitation link",
      icon: <Mail className="h-5 w-5 text-[#3B82F6]" />,
      bg: "bg-[#EFF6FF]",
    },
    {
      id: "phone",
      title: "Phone Number",
      desc: "Invite via SMS text message",
      icon: <MessageSquare className="h-5 w-5 text-[#10B981]" />,
      bg: "bg-[#ECFDF5]",
    },
    {
      id: "link",
      title: "Copy Link",
      desc: "Share anywhere you want",
      icon: <Link2 className="h-5 w-5 text-[#6366F1]" />,
      bg: "bg-[#EEF2FF]",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      desc: "Send a message directly",
      icon: <MessageCircle className="h-5 w-5 text-[#22C55E]" />,
      bg: "bg-[#F0FDF4]",
    },
  ];

  return (
    <div className="space-y-3">
      {shareOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => handleShareClick(option.id)}
          className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-gray-50/80 cursor-pointer transition-all group"
        >
          <div className={`h-10 w-10 rounded-xl ${option.bg} flex items-center justify-center shrink-0`}>
            {option.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-main">{option.title}</p>
            <p className="text-[11px] text-muted truncate">{option.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
