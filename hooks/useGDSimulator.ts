'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Topic, 
  Participant, 
  TranscriptItem, 
  DiscussionPhase, 
  GDReport 
} from '@/types/arena';
import { 
  TOPIC_PRESETS, 
  MOCK_PARTICIPANTS, 
  INITIAL_TRANSCRIPTS, 
  MOCK_REPORT_DATA 
} from '@/data/mockData';

export type ScreenState = 'hero' | 'setup' | 'arena' | 'report';

export function useGDSimulator() {
  const [screen, setScreen] = useState<ScreenState>('hero');
  const [selectedTopic, setSelectedTopic] = useState<Topic>(TOPIC_PRESETS[0]);
  const [panelSize, setPanelSize] = useState<number>(4);
  const [discussionMinutes, setDiscussionMinutes] = useState<number>(8);

  // Participants in active discussion
  const [participants, setParticipants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>('mod');
  const [currentSpeechSnippet, setCurrentSpeechSnippet] = useState<string>(
    'The floor is open for framing statements. I invite any candidate to begin.'
  );

  // Time & Phase
  const [remainingSeconds, setRemainingSeconds] = useState<number>(discussionMinutes * 60);
  const [phase, setPhase] = useState<DiscussionPhase>('opening');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Mic & User Controls
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [isHoldingSpeak, setIsHoldingSpeak] = useState<boolean>(false);
  const [userAudioLevel, setUserAudioLevel] = useState<number>(0);
  const [micError, setMicError] = useState<string | null>(null);

  // Live Transcript
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>(INITIAL_TRANSCRIPTS);

  // Final Report
  const [report, setReport] = useState<GDReport>(MOCK_REPORT_DATA);

  // Refs for intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechSimRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle Topic
  const shuffleTopic = useCallback(() => {
    const remaining = TOPIC_PRESETS.filter((t) => t.id !== selectedTopic.id);
    const randomTopic = remaining[Math.floor(Math.random() * remaining.length)] || TOPIC_PRESETS[0];
    setSelectedTopic(randomTopic);
  }, [selectedTopic]);

  // Start GD session from Setup
  const enterRoom = useCallback(() => {
    const totalSecs = discussionMinutes * 60;
    setRemainingSeconds(totalSecs);
    setPhase('opening');
    setIsPaused(false);
    setActiveSpeakerId('mod');
    setCurrentSpeechSnippet(`Welcome to this session on "${selectedTopic.title}". The floor is open.`);
    
    // Filter participants based on panelSize
    const moderator = MOCK_PARTICIPANTS.find((p) => p.role === 'moderator')!;
    const user = MOCK_PARTICIPANTS.find((p) => p.role === 'user')!;
    const ais = MOCK_PARTICIPANTS.filter((p) => p.role === 'ai').slice(0, panelSize);
    setParticipants([moderator, ...ais, user]);

    setTranscripts([
      {
        id: `t-start-${Date.now()}`,
        speakerId: 'mod',
        speakerName: 'Dr. Evelyn Vance',
        personality: 'Moderator',
        role: 'moderator',
        text: `Welcome to this round table on "${selectedTopic.title}". We have ${discussionMinutes} minutes allocated. I invite candidate opening statements.`,
        timestamp: '00:00',
        seconds: 0,
      }
    ]);

    setScreen('arena');
  }, [discussionMinutes, panelSize, selectedTopic]);

  // Push-to-Talk handlers
  const handleHoldSpeakStart = useCallback(() => {
    setIsHoldingSpeak(true);
    setActiveSpeakerId('user');
    setUserAudioLevel(0.85);
    setCurrentSpeechSnippet('You are speaking...');
  }, []);

  const handleHoldSpeakEnd = useCallback(() => {
    setIsHoldingSpeak(false);
    setUserAudioLevel(0);

    // Append user contribution to transcripts
    const newSeconds = Math.max(0, discussionMinutes * 60 - remainingSeconds);
    const mins = Math.floor(newSeconds / 60);
    const secs = newSeconds % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const userQuotes = [
      'I want to introduce a key structural point: we must balance immediate feasibility with long-term systemic resilience.',
      'To build on what Aarav mentioned, if we look at real-world benchmarks, the capital expenditure risk is manageable via public utility partnerships.',
      'Allow me to intervene politely—we cannot ignore the regulatory timeline before making decisive commitments.',
      'In summary, our group consensus leans toward an adaptive phased transition rather than an all-or-nothing doctrine.'
    ];
    const quote = userQuotes[Math.floor(Math.random() * userQuotes.length)];

    setTranscripts((prev) => [
      ...prev,
      {
        id: `t-user-${Date.now()}`,
        speakerId: 'user',
        speakerName: 'You (Candidate)',
        personality: 'Candidate',
        role: 'user',
        text: quote,
        timestamp: timeStr,
        seconds: newSeconds,
        highlight: true,
      }
    ]);

    // Hand floor back to an AI persona
    const availableAIs = participants.filter((p) => p.role === 'ai');
    if (availableAIs.length > 0) {
      const nextAI = availableAIs[Math.floor(Math.random() * availableAIs.length)];
      setActiveSpeakerId(nextAI.id);
      setCurrentSpeechSnippet(`[${nextAI.name}] Responding to candidate's contribution...`);
    }
  }, [discussionMinutes, remainingSeconds, participants]);

  // Submit typed speech as fallback or typing option
  const handleSubmitTypedSpeech = useCallback((text: string) => {
    const newSeconds = Math.max(0, discussionMinutes * 60 - remainingSeconds);
    const mins = Math.floor(newSeconds / 60);
    const secs = newSeconds % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    setTranscripts((prev) => [
      ...prev,
      {
        id: `t-user-${Date.now()}`,
        speakerId: 'user',
        speakerName: 'You (Candidate)',
        personality: 'Candidate',
        role: 'user',
        text: text,
        timestamp: timeStr,
        seconds: newSeconds,
        highlight: true,
      }
    ]);

    const availableAIs = participants.filter((p) => p.role === 'ai');
    if (availableAIs.length > 0) {
      const nextAI = availableAIs[Math.floor(Math.random() * availableAIs.length)];
      setActiveSpeakerId(nextAI.id);
      setCurrentSpeechSnippet(`[${nextAI.name}] Responding to candidate statement...`);
    }
  }, [discussionMinutes, remainingSeconds, participants]);

  // Interrupt button
  const handleInterrupt = useCallback(() => {
    setActiveSpeakerId('user');
    setCurrentSpeechSnippet('Candidate is respectfully intervening...');
    setTimeout(() => {
      handleHoldSpeakStart();
    }, 400);
  }, [handleHoldSpeakStart]);

  // Mic toggle
  const handleToggleMic = useCallback(() => {
    setIsMicOn((prev) => !prev);
  }, []);

  // Pause toggle
  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Skip to closing round
  const handleSkipToClosing = useCallback(() => {
    setRemainingSeconds(60);
    setPhase('closing');
    setActiveSpeakerId('mod');
    setCurrentSpeechSnippet('Moderator: "We are entering the final 60 seconds. Each candidate has one concise wrap-up."');
  }, []);

  // End discussion & calculate report
  const handleEndGD = useCallback(() => {
    setIsPaused(true);
    setScreen('report');
  }, []);

  // Retry Mic
  const handleRetryMic = useCallback(() => {
    if (micError) {
      setMicError(null);
    } else {
      setMicError('Hardware mic input packet dropped. Check OS audio privacy permissions.');
    }
  }, [micError]);

  // Timer Tick & Phase Logic in Arena
  useEffect(() => {
    if (screen !== 'arena' || isPaused) return;

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleEndGD();
          return 0;
        }

        const totalSecs = discussionMinutes * 60;
        const elapsedRatio = 1 - prev / totalSecs;

        if (elapsedRatio > 0.85) {
          setPhase('closing');
        } else if (elapsedRatio > 0.25) {
          setPhase('discussion');
        } else {
          setPhase('opening');
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, isPaused, discussionMinutes, handleEndGD]);

  // AI Turn Cycling simulation
  useEffect(() => {
    if (screen !== 'arena' || isPaused || isHoldingSpeak || isMicOn) return;

    speechSimRef.current = setInterval(() => {
      const candidates = participants.filter((p) => p.role !== 'user');
      if (candidates.length === 0) return;

      const randomSpeaker = candidates[Math.floor(Math.random() * candidates.length)];
      setActiveSpeakerId(randomSpeaker.id);

      const aiLines: Record<string, string[]> = {
        'Dr. Evelyn Vance': [
          'Let us remember to address the economic viability as well as philosophical rationale.',
          'Priya has raised an essential point. Let us hear responses from the floor.',
          'Please ensure all participants have space to articulate their stance.'
        ],
        'Aarav Mehta': [
          'Looking at the empirical data, capital allocation requires a calculated risk horizon.',
          'If we quantify the infrastructure overhead, the return curve flattens in year three.',
          'We must evaluate the operational cost model before committing further.'
        ],
        'Priya Sharma': [
          'I must challenge that underlying hypothesis—what happens when market supply pivots?',
          'That proposal assumes perfect regulatory harmony, which rarely occurs in practice.',
          'Let us interrogate the vulnerability of that assumption.'
        ],
        'Rohan Kapoor': [
          'Consider an unconventional parallel: municipal water networks versus privately bottled supply.',
          'What if we invert the problem and decentralize local compute hubs?',
          'A lateral design approach could bypass the geopolitical friction completely.'
        ],
        'Maya Sen': [
          'Synthesizing both arguments, we are discussing public utility standards versus private agility.',
          'A modular hybrid architecture offers the cleanest compromise.',
          'Let us focus on the core value proposition for end users.'
        ],
        'Vikram Singhania': [
          'If you hesitate, your competitors seize the entire first-mover distribution advantage!',
          'Incremental compromises produce mediocre outcomes; bold execution is required now.',
          'We cannot afford analytical paralysis in a fast-moving landscape.'
        ],
      };

      const lines = aiLines[randomSpeaker.name] || ['I agree with the core premise and would like to build on that.'];
      const text = lines[Math.floor(Math.random() * lines.length)];
      setCurrentSpeechSnippet(`"${text}"`);

      // Add to transcript
      const newSeconds = Math.max(0, discussionMinutes * 60 - remainingSeconds);
      const mins = Math.floor(newSeconds / 60);
      const secs = newSeconds % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      setTranscripts((prev) => [
        ...prev,
        {
          id: `t-ai-${Date.now()}`,
          speakerId: randomSpeaker.id,
          speakerName: randomSpeaker.name,
          personality: randomSpeaker.personality,
          role: randomSpeaker.role,
          text: text,
          timestamp: timeStr,
          seconds: newSeconds,
        }
      ]);
    }, 9000);

    return () => {
      if (speechSimRef.current) clearInterval(speechSimRef.current);
    };
  }, [screen, isPaused, isHoldingSpeak, isMicOn, participants, discussionMinutes, remainingSeconds]);

  return {
    screen,
    setScreen,
    selectedTopic,
    setSelectedTopic,
    panelSize,
    setPanelSize,
    discussionMinutes,
    setDiscussionMinutes,
    participants,
    activeSpeakerId,
    currentSpeechSnippet,
    remainingSeconds,
    phase,
    isPaused,
    isMicOn,
    isHoldingSpeak,
    userAudioLevel,
    micError,
    transcripts,
    report,
    shuffleTopic,
    enterRoom,
    handleHoldSpeakStart,
    handleHoldSpeakEnd,
    handleSubmitTypedSpeech,
    handleInterrupt,
    handleToggleMic,
    handleTogglePause,
    handleSkipToClosing,
    handleEndGD,
    handleRetryMic,
  };
}
