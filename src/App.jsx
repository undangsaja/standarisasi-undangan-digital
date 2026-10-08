import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import invitationData from './data/invitationData.json';
import { useGuestName } from './hooks/useGuestName';

import MobileContainer from './components/layout/MobileContainer';
import FloatingNavbar from './components/layout/FloatingNavbar';
import AudioPlayer from './components/layout/AudioPlayer';
import ScreenOrnaments from './components/layout/ScreenOrnaments';

import OpeningSection from './components/sections/01_OpeningSection';
import CoupleSection from './components/sections/02_CoupleSection';
import QuotesSection from './components/sections/03_QuotesSection';
import EventSection from './components/sections/04_EventSection';
import CountdownSection from './components/sections/05_CountdownSection';
import GallerySection from './components/sections/06_GallerySection';
import RsvpSection from './components/sections/07_RsvpSection';
import GiftSection from './components/sections/08_GiftSection';
import ThanksSection from './components/sections/09_ThanksSection';

export default function App() {
  const guestName = useGuestName('Tamu Undangan');
  const [activePage, setActivePage] = useState('opening');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [autoPlayRequested, setAutoPlayRequested] = useState(false);

  // Initialize AOS once on mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-cubic',
      mirror: true,
      offset: 0,
    });
  }, []);

  // Trigger AOS re-animation every time activePage changes
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 60);

    return () => clearTimeout(timer);
  }, [activePage]);

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    setAutoPlayRequested(true);
    setActivePage('couple');
  };

  const handleSelectPage = (pageId) => {
    setActivePage(pageId);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'opening':
        return (
          <OpeningSection
            data={invitationData}
            guestName={guestName}
            onOpenInvitation={handleOpenInvitation}
            isUnlocked={isUnlocked}
          />
        );
      case 'couple':
        return <CoupleSection data={invitationData} />;
      case 'quotes':
        return <QuotesSection data={invitationData} />;
      case 'event':
        return <EventSection data={invitationData} />;
      case 'countdown':
        return <CountdownSection data={invitationData} />;
      case 'gallery':
        return <GallerySection data={invitationData} />;
      case 'rsvp':
        return <RsvpSection guestName={guestName} />;
      case 'gift':
        return <GiftSection data={invitationData} />;
      case 'thanks':
        return <ThanksSection data={invitationData} />;
      default:
        return <CoupleSection data={invitationData} />;
    }
  };

  return (
    <MobileContainer>
      {/* Animated Corner & Side Ornaments */}
      {invitationData.ornaments?.enabled && (
        <ScreenOrnaments config={invitationData.ornaments} />
      )}

      {/* Floating Audio Player Control (Available once unlocked) */}
      <AudioPlayer 
        audioUrl={invitationData.meta.audioUrl} 
        autoPlayRequested={autoPlayRequested} 
      />

      {/* Screen Viewport: Strictly 100% height, zero window scroll */}
      <div 
        key={activePage}
        className="w-full h-full max-h-[100dvh] overflow-hidden relative bg-stone-50"
      >
        {renderActivePage()}
      </div>

      {/* Floating Bottom Pill Navbar with 4 visible scrollable items */}
      <FloatingNavbar 
        isUnlocked={isUnlocked}
        activePage={activePage}
        onSelectPage={handleSelectPage}
      />
    </MobileContainer>
  );
}
