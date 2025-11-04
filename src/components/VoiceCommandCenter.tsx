import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VoiceCommand {
  type: string;
  confidence: number;
  parameters: Record<string, any>;
  query: string;
  response: string;
  clarification?: string;
}

export function VoiceCommandCenter() {
  const {
    isListening,
    isSupported: voiceSupported,
    transcript,
    interimTranscript,
    error: voiceError,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoiceRecognition();

  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    isSupported: ttsSupported,
  } = useTextToSpeech();

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [voiceFeedbackEnabled, setVoiceFeedbackEnabled] = useState(true);

  const processCommand = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-voice-command', {
        body: { transcript: text }
      });

      if (error) throw error;

      const command = data as VoiceCommand;
      setLastCommand(command);

      // Provide voice feedback if enabled
      if (voiceFeedbackEnabled && ttsSupported) {
        const feedbackText = command.clarification || command.response;
        speak(feedbackText);
      }

      // Show toast notification
      toast.success('Command processed', {
        description: command.response
      });

      clearTranscript();
    } catch (err) {
      console.error('Error processing command:', err);
      toast.error('Failed to process command', {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      // Process the command when stopping
      if (transcript) {
        processCommand(transcript);
      }
    } else {
      startListening();
    }
  };

  const handleManualSubmit = () => {
    if (transcript) {
      stopListening();
      processCommand(transcript);
    }
  };

  if (!voiceSupported) {
    return (
      <Card className="p-8 text-center">
        <p className="text-destructive mb-2">Voice recognition is not supported in this browser</p>
        <p className="text-sm text-muted-foreground">
          Please use Chrome, Edge, or Safari for voice features
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center space-y-6">
        {/* Microphone Button */}
        <div className="relative">
          <button
            onClick={handleVoiceToggle}
            disabled={isProcessing}
            className={`
              h-32 w-32 rounded-full transition-all duration-300
              flex items-center justify-center
              ${isListening 
                ? 'bg-primary animate-pulse-slow glow-blue' 
                : 'bg-muted hover:bg-accent'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isListening ? (
              <Mic className="h-16 w-16 text-primary-foreground" />
            ) : (
              <MicOff className="h-16 w-16 text-foreground" />
            )}
          </button>

          {/* Pulsing ring animation when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-75" />
          )}
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">
            {isListening ? (
              <span className="text-primary">Listening...</span>
            ) : isProcessing ? (
              <span className="text-secondary">Processing...</span>
            ) : (
              <span className="text-muted-foreground">Voice Mode {isSpeaking ? '(Speaking)' : 'OFF'}</span>
            )}
          </p>
          {voiceError && (
            <p className="text-xs text-destructive">{voiceError}</p>
          )}
        </div>

        {/* Transcript Display */}
        <div className="w-full min-h-[120px] p-4 rounded-md bg-muted/50 border border-border">
          <div className="space-y-2">
            {transcript && (
              <p className="text-foreground font-mono text-sm">{transcript}</p>
            )}
            {interimTranscript && (
              <p className="text-muted-foreground font-mono text-sm italic">
                {interimTranscript}
              </p>
            )}
            {!transcript && !interimTranscript && (
              <p className="text-muted-foreground text-sm text-center">
                Click the microphone to start speaking
              </p>
            )}
          </div>
        </div>

        {/* Command Response */}
        {lastCommand && (
          <div className="w-full p-4 rounded-md bg-accent/50 border border-accent">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">
                  {lastCommand.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  Confidence: {(lastCommand.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-sm">{lastCommand.response}</p>
              {lastCommand.clarification && (
                <p className="text-sm text-secondary italic">{lastCommand.clarification}</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleManualSubmit}
            disabled={!transcript || isListening || isProcessing}
            className="flex-1"
          >
            Process Command
          </Button>
          
          <Button
            onClick={() => setVoiceFeedbackEnabled(!voiceFeedbackEnabled)}
            variant={voiceFeedbackEnabled ? "default" : "outline"}
            size="icon"
            disabled={!ttsSupported}
          >
            {voiceFeedbackEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>

          {isSpeaking && (
            <Button
              onClick={stopSpeaking}
              variant="destructive"
              size="icon"
            >
              <VolumeX className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="w-full text-xs text-muted-foreground space-y-1">
          <p className="font-semibold">Voice Command Examples:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>"Show me all armed robberies in Sector 9"</li>
            <li>"Find cases from last month"</li>
            <li>"Search for burglaries near downtown"</li>
            <li>"Show case details for ID 2024-001"</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
