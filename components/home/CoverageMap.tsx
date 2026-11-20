"use client";

import { useState } from "react";
import {
  faridabad,
  mapViewBox,
  supplyStates,
} from "@/data/coverage";
import { INDIA_OUTLINE_PATH } from "@/data/india-outline";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/links";

export function CoverageMap() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-12 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
      <div className="col-span-4 lg:col-span-7">
        <div className="mx-auto w-full max-w-[420px] lg:max-w-[560px]">
          <svg
            viewBox={mapViewBox}
            role="img"
            aria-label="Map of India showing states supplied by SSE Aftermarket Solution"
            className="h-auto w-full"
          >
            <path
              d={INDIA_OUTLINE_PATH}
              fill="#F4F5F7"
              stroke="#D9DCE1"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {supplyStates.map((state) => {
              const isSelected = selected === state.name;
              const dimmed = selected !== null && !isSelected;

              return (
                <g key={state.name}>
                  {isSelected ? (
                    <circle
                      cx={state.x}
                      cy={state.y}
                      r="13"
                      fill="none"
                      stroke="#0B1530"
                      strokeWidth="1.5"
                    />
                  ) : null}
                  <circle
                    cx={state.x}
                    cy={state.y}
                    r={isSelected ? 8 : 6}
                    fill="#0B1530"
                    opacity={dimmed ? 0.3 : 1}
                    className="transition-opacity duration-150"
                  />
                </g>
              );
            })}

            <circle
              cx={faridabad.x}
              cy={faridabad.y}
              r="8"
              fill="#F5B800"
              stroke="#0B1530"
              strokeWidth="2"
            />
            <text
              x={faridabad.x + 15}
              y={faridabad.y + 5}
              fill="#0B1530"
              fontSize="18"
              fontFamily="var(--font-mono)"
              letterSpacing="0.5"
            >
              Faridabad
            </text>
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em] text-navy/50">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 bg-yellow" />
            Faridabad HQ
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 bg-navy" />
            Supplied state
          </span>
        </div>
      </div>

      <div className="col-span-4 lg:col-span-4 lg:col-start-9">
        <div
          role="group"
          aria-label="Supply states"
          className="grid grid-cols-2 gap-x-4"
        >
          {supplyStates.map((state) => {
            const isSelected = selected === state.name;

            return (
              <button
                key={state.name}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelected((current) =>
                    current === state.name ? null : state.name,
                  )
                }
                className={`flex min-h-10 items-center gap-2 border-b border-line py-2 text-left text-sm transition-colors hover:text-navy ${
                  isSelected ? "font-medium text-navy" : "text-navy/70"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 ${
                    isSelected ? "bg-yellow" : "bg-navy/15"
                  }`}
                />
                {state.name}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mt-6 min-h-[132px] border-t border-line pt-4"
        >
          {selected ? (
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/45">
                Supply state
              </p>
              <p className="mt-2 text-lg font-medium">{selected}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">
                Dispatch from Faridabad. Confirm quantity, part numbers and lead
                time with our team.
              </p>
              <ButtonLink
                href={whatsappHref(
                  `Hello SSE, I would like to check supply to ${selected}.`,
                )}
                variant="outline"
                className="mt-4 min-h-10 px-4 text-[9px]"
              >
                Check delivery
              </ButtonLink>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-navy/55">
              Select a state to check supply. We dispatch from Faridabad to
              dealers and workshops across India.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
