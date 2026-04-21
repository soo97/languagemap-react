import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeService } from '../../../api/place/placeService';
import { useMapingoStore } from '../../../store/useMapingoStore';
import RouteMap from '../components/RouteMap';
import '../styles/mapPage.css';

function buildAiReply(place, userInput, turn) {
  const normalized = userInput.trim().toLowerCase();

  if (!normalized) {
    return 'Could you say that one more time?';
  }

  if (normalized.includes('hello') || normalized.includes('hi')) {
    return `Hello. We are practicing the ${place.title} scenario, so feel free to speak naturally.`;
  }

  if (normalized.includes('thank')) {
    return 'You are welcome. Keep the conversation going just like a real place interaction.';
  }

  if (normalized.includes('?')) {
    return `That question works well here. In this ${place.placeType.toLowerCase()} scenario, you can also ask for more detail if you need it.`;
  }

  if (turn === 0) {
    return place.chatSteps[0]?.prompt ?? `Welcome to ${place.title}. How can I help you today?`;
  }

  if (turn === 1) {
    return place.chatSteps[1]?.prompt ?? 'Sounds good. Can you tell me a bit more?';
  }

  if (turn === 2) {
    return place.chatSteps[2]?.prompt ?? 'Great. Is there anything else you would like to ask?';
  }

  if (turn > 4) {
    return `Nice work. Your English fits the ${place.title} situation well. You can wrap up the conversation whenever you are ready.`;
  }

  return `That sounds natural for ${place.category}. Try adding one more sentence to make the conversation richer.`;
}

function MapPage() {
  const navigate = useNavigate();
  const places = placeService.fetchRoutes();
  const capitals = placeService.fetchPlaceTabs();
  const activeCapitalId = useMapingoStore((state) => state.mapActiveTab);
  const selectedPlaceId = useMapingoStore((state) => state.selectedRouteId);
  const setActiveCapitalId = useMapingoStore((state) => state.setMapActiveTab);
  const setSelectedPlaceId = useMapingoStore((state) => state.setSelectedRouteId);
  const setRecentMapChatLog = useMapingoStore((state) => state.setRecentMapChatLog);
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelMode, setPanelMode] = useState('guide');
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Starter');

  useEffect(() => {
    const pageShell = document.querySelector('.mapingo-page-shell');
    document.body.classList.add('map-domain-scroll-lock');
    pageShell?.classList.add('map-domain-page-shell');

    return () => {
      document.body.classList.remove('map-domain-scroll-lock');
      pageShell?.classList.remove('map-domain-page-shell');
    };
  }, []);

  const currentCapitalId = capitals.some((capital) => capital.id === activeCapitalId) ? activeCapitalId : 'all';

  const visiblePlaces = useMemo(() => {
    if (currentCapitalId === 'all') {
      return places;
    }

    return places.filter((place) => place.capitalId === currentCapitalId);
  }, [currentCapitalId, places]);

  const selectedPlace = useMemo(() => {
    if (!selectedPlaceId) {
      return null;
    }

    return visiblePlaces.find((place) => place.id === selectedPlaceId) ?? null;
  }, [selectedPlaceId, visiblePlaces]);

  const selectedCapital = useMemo(() => {
    return capitals.find((capital) => capital.id === currentCapitalId) ?? capitals[0];
  }, [capitals, currentCapitalId]);

  const resetChatState = () => {
    setChatLog([]);
    setChatInput('');
    setRecentMapChatLog([]);
  };

  const handleCapitalChange = (capitalId) => {
    setActiveCapitalId(capitalId);
    setSelectedPlaceId('');
    setPanelVisible(false);
    setPanelMode('guide');
    setSelectedLevel('Starter');
    resetChatState();
  };

  const handleSelectPlace = (placeId) => {
    if (!placeId) {
      setSelectedPlaceId('');
      setPanelVisible(false);
      setPanelMode('guide');
      setSelectedLevel('Starter');
      resetChatState();
      return;
    }

    setSelectedPlaceId(placeId);
    setPanelVisible(true);
    setPanelMode('detail');
    const nextPlace = places.find((place) => place.id === placeId);
    setSelectedLevel(nextPlace?.difficulty ?? 'Starter');
    resetChatState();
  };

  const handleStartLearning = () => {
    if (!selectedPlace) {
      return;
    }

    setPanelVisible(true);
    setPanelMode('chat');
    setChatInput('');
    const initialLog = [
      {
        role: 'ai',
        speaker: selectedPlace.chatSteps[0]?.speaker ?? 'AI Coach',
        text:
          selectedPlace.chatSteps[0]?.prompt ??
          `Welcome to ${selectedPlace.title}. Start talking to me as if you are really there.`,
      },
    ];

    setChatLog(initialLog);
    setRecentMapChatLog(initialLog);
  };

  const handleSendMessage = () => {
    if (!selectedPlace) {
      return;
    }

    const trimmed = chatInput.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = {
      role: 'user',
      speaker: 'You',
      text: trimmed,
    };

    const aiMessage = {
      role: 'ai',
      speaker: selectedPlace.chatSteps[Math.min(chatLog.length, selectedPlace.chatSteps.length - 1)]?.speaker ?? 'AI Coach',
      text: buildAiReply(selectedPlace, trimmed, chatLog.filter((message) => message.role === 'user').length),
    };

    const nextLog = [...chatLog, userMessage, aiMessage];

    setChatLog(nextLog);
    setRecentMapChatLog(nextLog);
    setChatInput('');
  };

  const handleBackToDetail = () => {
    setPanelMode(selectedPlace ? 'detail' : 'guide');
    resetChatState();
  };

  return (
    <div className="map-domain-page">
      <section className="map-domain-shell">
        <RouteMap
          places={places}
          capitals={capitals}
          activeCapitalId={currentCapitalId}
          selectedCapital={selectedCapital}
          selectedPlace={selectedPlace}
          visiblePlaceCount={visiblePlaces.length}
          panelVisible={panelVisible}
          panelMode={panelMode}
          chatLog={chatLog}
          chatInput={chatInput}
          selectedLevel={selectedLevel}
          onChatInputChange={setChatInput}
          onSelectLevel={setSelectedLevel}
          onSendMessage={handleSendMessage}
          onSelectCapital={handleCapitalChange}
          onSelectPlace={handleSelectPlace}
          onClosePanel={() => handleSelectPlace(null)}
          onStartLearning={handleStartLearning}
          onBackToDetail={handleBackToDetail}
          onOpenPremium={() => navigate('/premium')}
        />
      </section>
    </div>
  );
}

export default MapPage;
