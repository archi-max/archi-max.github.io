import { useState, useRef, useCallback, useEffect } from "react";
import { X, Maximize2, Minimize2, Loader2, GripHorizontal } from "lucide-react";

interface SakuraTerminalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_WIDTH = 900;
const INITIAL_HEIGHT = 600;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;
const TITLE_BAR_HEIGHT = 36;

export function SakuraTerminal({ open, onClose }: SakuraTerminalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: INITIAL_WIDTH, h: INITIAL_HEIGHT });
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Center the window on first open
  useEffect(() => {
    if (open && !initialized) {
      const w = Math.min(INITIAL_WIDTH, window.innerWidth - 40);
      const h = Math.min(INITIAL_HEIGHT, window.innerHeight - 40);
      setSize({ w, h });
      setPos({
        x: Math.round((window.innerWidth - w) / 2),
        y: Math.round((window.innerHeight - h) / 2),
      });
      setInitialized(true);
    }
  }, [open, initialized]);

  // Disable pointer events on iframe while dragging/resizing
  const setIframePointerEvents = (enabled: boolean) => {
    if (iframeRef.current) {
      iframeRef.current.style.pointerEvents = enabled ? "auto" : "none";
    }
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging.current) {
        setPos({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      } else if (resizing.current) {
        setSize((prev) => ({
          w: Math.max(MIN_WIDTH, e.clientX - pos.x),
          h: Math.max(MIN_HEIGHT, e.clientY - pos.y),
        }));
      }
    },
    [pos.x, pos.y]
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    resizing.current = false;
    setIframePointerEvents(true);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const startDrag = (e: React.MouseEvent) => {
    if (isFullscreen) return;
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setIframePointerEvents(false);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFullscreen) return;
    resizing.current = true;
    setIframePointerEvents(false);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  if (!open) return null;

  const style = isFullscreen
    ? { inset: "8px" as const }
    : {
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
      };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Terminal window */}
      <div
        className="absolute flex flex-col rounded-lg overflow-hidden shadow-2xl pointer-events-auto animate-terminal-in"
        style={{
          ...style,
          boxShadow:
            "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Title bar — draggable */}
        <div
          className="flex items-center justify-between px-4 bg-[#1c1c1c] border-b border-[#333] select-none cursor-grab active:cursor-grabbing"
          style={{ height: TITLE_BAR_HEIGHT, minHeight: TITLE_BAR_HEIGHT }}
          onMouseDown={startDrag}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors group relative"
            >
              <X
                size={8}
                className="absolute inset-0 m-auto text-[#4a0000] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <button
              onClick={toggleFullscreen}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-[#888] text-xs font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            sakuraos@qemu
          </div>

          <button
            onClick={toggleFullscreen}
            onMouseDown={(e) => e.stopPropagation()}
            className="text-[#888] hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>

        {/* Terminal body */}
        <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
              <Loader2 size={20} className="text-green-500 animate-spin" />
              <p className="text-[#888] text-xs font-mono">
                Booting SakuraOS...
              </p>
              <p className="text-[#555] text-xs font-mono">
                QEMU compiling in browser — may take a moment
              </p>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src="/sakura/index.html"
            className="w-full h-full border-0"
            style={{ overflow: "hidden" }}
            scrolling="no"
            title="SakuraOS — RISC-V Operating System"
            allow="cross-origin-isolated"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Resize handle (bottom-right corner) */}
        {!isFullscreen && (
          <div
            className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-20 flex items-end justify-end p-0.5"
            onMouseDown={startResize}
          >
            <GripHorizontal size={12} className="text-[#555] rotate-[-45deg]" />
          </div>
        )}
      </div>
    </div>
  );
}
