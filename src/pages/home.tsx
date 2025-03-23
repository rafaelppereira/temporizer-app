/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
import {
  CheckIcon,
  PencilIcon,
  PlayIcon,
  RefreshCcwIcon,
  SquareIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { cn } from '../@config/lib/cn'
import { Button } from '../components/ui/button'

const timeValue = 0

export function Home() {
  const countdownTimeout = useRef<NodeJS.Timeout | null>(null)

  const [time, setTime] = useState(timeValue)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const [hasPlayedCountdown, setHasPlayedCountdown] = useState(false)
  const [hasEdit, setHasEdit] = useState(false)

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time / 60) % 60)
  const seconds = time % 60

  const [hoursLeft, hoursRight] = String(hours).padStart(2, '0').split('')
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  const handleStartCountdown = () => {
    setIsActive(true)
  }

  const handlePauseCountdown = () => {
    setIsActive(false)
    if (countdownTimeout.current) {
      clearTimeout(countdownTimeout.current)
    }
  }

  const handleResetCountdown = () => {
    setIsActive(false)
    setHasFinished(false)
    setTime(timeValue)
    setHasPlayedCountdown(false)
    if (countdownTimeout.current) {
      clearTimeout(countdownTimeout.current)
    }
  }

  const updateTimePart = (
    part: 'hours' | 'minutes' | 'seconds',
    left: string,
    right: string,
  ) => {
    const h =
      part === 'hours' ? Number(`${left}${right}`) : Math.floor(time / 3600)
    const m =
      part === 'minutes'
        ? Number(`${left}${right}`)
        : Math.floor((time / 60) % 60)
    const s = part === 'seconds' ? Number(`${left}${right}`) : time % 60

    const newTime = h * 3600 + m * 60 + s
    setTime(newTime)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      if (time === 10 && !hasPlayedCountdown) {
        const countdownAudio = new Audio('./finishing.mp3')
        countdownAudio.play()
        setHasPlayedCountdown(true)
      }

      countdownTimeout.current = setTimeout(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      window.electronAPI?.notifyFinished()
      setIsActive(false)
      setHasPlayedCountdown(false)
    }

    return () => {
      if (countdownTimeout.current) {
        clearTimeout(countdownTimeout.current)
      }
    }
  }, [isActive, time])

  const hasTimeGreaterThanTen = !isActive || time > 10 || time === 0

  return (
    <div
      className={cn(
        'flex min-h-screen items-center justify-center overflow-hidden transition-all duration-1000',
        hasFinished ? 'bg-emerald-600' : 'bg-zinc-900',
      )}
    >
      <Helmet
        title={`${hasFinished ? 'FINALIZOU! SEU TEMPORIZER' : `${hasTimeGreaterThanTen ? `${hoursLeft}${hoursRight}:${minuteLeft}${minuteRight}:${secondLeft}${secondRight}` : `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`}`}`}
      />

      <div className="relative flex flex-col items-center">
        {!hasFinished && (
          <img
            src="./logo.svg"
            alt="Temporizer"
            className={cn(
              'pointer-events-none visible absolute -top-20 w-60 select-none opacity-100 transition-all duration-300 md:w-80',
              !isActive ||
                (!hasTimeGreaterThanTen &&
                  !hasEdit &&
                  'invisible -top-72 opacity-0'),
            )}
          />
        )}

        <div
          className={cn(
            'font-orbitron xs:text-[3rem] flex select-none items-center text-[2.5rem] font-medium text-emerald-500 transition-all sm:text-[4rem] md:text-[6rem] lg:text-[8em]',
            hasFinished && 'text-white',
          )}
        >
          {!hasFinished ? (
            <>
              <div
                className={cn(
                  'visible relative bottom-0 flex items-center opacity-100 transition-all duration-500',
                  !isActive ||
                    (!hasTimeGreaterThanTen &&
                      !hasEdit &&
                      'invisible -bottom-72 !text-zinc-700 opacity-0'),
                )}
              >
                <div className="flex gap-1">
                  <input
                    type="text"
                    maxLength={1}
                    value={hoursLeft}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('hours', e.target.value, hoursRight)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    value={hoursRight}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('hours', hoursLeft, e.target.value)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                </div>
                <span>:</span>
                <div className="flex gap-1">
                  <input
                    type="text"
                    maxLength={1}
                    value={minuteLeft}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('minutes', e.target.value, minuteRight)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    value={minuteRight}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('minutes', minuteLeft, e.target.value)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                </div>
                <span>:</span>
                <div className="flex gap-1">
                  <input
                    type="text"
                    maxLength={1}
                    value={secondLeft}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('seconds', e.target.value, secondRight)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    value={secondRight}
                    readOnly={!hasEdit}
                    onChange={(e) =>
                      updateTimePart('seconds', secondLeft, e.target.value)
                    }
                    className={cn(
                      'font-orbitron w-[1.2ch] rounded-sm border-2 border-transparent bg-zinc-800 text-center outline-none',
                      hasEdit && 'border-emerald-500',
                    )}
                  />
                </div>
              </div>

              <div
                className={cn(
                  'visible absolute bottom-0 left-1/2 -translate-x-1/2 opacity-100 transition-all duration-700',
                  (!isActive || hasTimeGreaterThanTen || hasEdit) &&
                    'invisible -bottom-40 opacity-0',
                )}
              >
                <span>{seconds}</span>
              </div>
            </>
          ) : (
            <div>
              <span>0</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            'visible absolute -bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-8 opacity-100 transition-all duration-500',
            (hasEdit || !hasTimeGreaterThanTen) &&
              'invisible -bottom-72 opacity-0',
          )}
        >
          {!hasFinished && (
            <Button
              size="icon"
              type="button"
              variant="outline"
              onClick={() => {
                handlePauseCountdown()
                setHasEdit(true)
              }}
              title="Clique para editar o contador"
              className="rounded-full bg-transparent text-white"
            >
              <PencilIcon className="size-4" />
              <span className="sr-only">Editar contador</span>
            </Button>
          )}

          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleResetCountdown}
            title="Clique para resetar o contador"
            className={cn(
              'rounded-full bg-transparent text-white transition-all duration-500',
              hasFinished && 'bg-white text-zinc-600',
            )}
          >
            <RefreshCcwIcon className="size-4" />
            <span className="sr-only">Resetar contador</span>
          </Button>

          {!hasFinished && (
            <>
              <Button
                size="icon"
                type="button"
                variant="outline"
                disabled={!isActive}
                onClick={handlePauseCountdown}
                title="Clique para pausar o contador"
                className="rounded-full bg-transparent text-rose-500"
              >
                <SquareIcon className="size-4" />
                <span className="sr-only">Pausar contador</span>
              </Button>

              <Button
                size="icon"
                type="button"
                variant="outline"
                disabled={isActive}
                onClick={handleStartCountdown}
                title="Clique para iniciar o contador"
                className="rounded-full bg-transparent text-emerald-500"
              >
                <PlayIcon className="size-4" />
                <span className="sr-only">Iniciar contador</span>
              </Button>
            </>
          )}
        </div>

        <div
          className={cn(
            'invisible absolute -bottom-72 left-1/2 flex -translate-x-1/2 items-center gap-8 opacity-0 transition-all duration-500',
            hasEdit && 'visible -bottom-20 opacity-100',
          )}
        >
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={() => setHasEdit(false)}
            title="Clique para cancelar a edição do contador"
            className="rounded-full bg-transparent text-emerald-500"
          >
            <CheckIcon className="size-4" />
            <span className="sr-only">Cancelar edição</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
