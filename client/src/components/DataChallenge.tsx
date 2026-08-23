import { motion } from 'framer-motion';
import { BarChart3, Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const questions = [
  {
    prompt: 'game.q1',
    options: ['game.q1.a', 'game.q1.b', 'game.q1.c', 'game.q1.d'],
    answer: 1,
    explanation: 'game.q1.explanation',
  },
  {
    prompt: 'game.q2',
    options: ['game.q2.a', 'game.q2.b', 'game.q2.c', 'game.q2.d'],
    answer: 0,
    explanation: 'game.q2.explanation',
  },
  {
    prompt: 'game.q3',
    options: ['game.q3.a', 'game.q3.b', 'game.q3.c', 'game.q3.d'],
    answer: 2,
    explanation: 'game.q3.explanation',
  },
  {
    prompt: 'game.q4',
    options: ['game.q4.a', 'game.q4.b', 'game.q4.c', 'game.q4.d'],
    answer: 3,
    explanation: 'game.q4.explanation',
  },
  {
    prompt: 'game.q5',
    options: ['game.q5.a', 'game.q5.b', 'game.q5.c', 'game.q5.d'],
    answer: 1,
    explanation: 'game.q5.explanation',
  },
] as const;

export default function DataChallenge() {
  const { t } = useLanguage();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[questionIndex];
  const answered = selectedAnswer !== null;

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
    if (answerIndex === question.answer) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  const progress = ((questionIndex + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <section id="game" className="bg-background py-20 md:py-28" aria-labelledby="data-challenge-title">
      <div className="container max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="accent-line mb-4" />
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t('game.badge')}
            </div>
            <h2 id="data-challenge-title" className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('game.title')}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t('game.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"
          >
            {isFinished ? (
              <div className="text-center" aria-live="polite">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart3 className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t('game.complete')}</p>
                <h3 className="mb-3 text-3xl font-bold text-foreground">{t('game.resultTitle')}</h3>
                <p className="mb-7 text-lg text-muted-foreground">
                  {t('game.resultMessage').replace('{score}', String(score)).replace('{total}', String(questions.length))}
                </p>
                <Button type="button" onClick={resetGame} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('game.playAgain')}
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-7 flex items-center justify-between gap-4 text-sm font-semibold text-muted-foreground">
                  <span>
                    {t('game.question')} {questionIndex + 1} {t('game.of')} {questions.length}
                  </span>
                  <span className="text-primary">{t('game.score')}: {score}</span>
                </div>
                <div className="mb-8 h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                  <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <fieldset>
                  <legend className="mb-6 text-xl font-bold leading-snug text-foreground">{t(question.prompt)}</legend>
                  <div className="grid gap-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex;
                      const isCorrect = question.answer === optionIndex;
                      const stateClass = !answered
                        ? 'border-border bg-background hover:border-primary hover:bg-primary/5'
                        : isCorrect
                          ? 'border-primary bg-primary/10 text-primary'
                          : isSelected
                            ? 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-border bg-background opacity-60';

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleAnswer(optionIndex)}
                          disabled={answered}
                          aria-pressed={isSelected}
                          className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium text-foreground transition-colors ${stateClass}`}
                        >
                          <span>{t(option)}</span>
                          {answered && isCorrect && <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
                          {answered && isSelected && !isCorrect && <X className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {answered && (
                  <div className="mt-6 rounded-lg bg-secondary p-4 text-sm text-muted-foreground" aria-live="polite">
                    <p className="mb-1 font-semibold text-foreground">
                      {selectedAnswer === question.answer ? t('game.correct') : t('game.incorrect')}
                    </p>
                    <p>{t(question.explanation)}</p>
                  </div>
                )}

                <div className="mt-7 flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">{t('game.choose')}</span>
                  <Button type="button" onClick={handleNext} disabled={!answered} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {questionIndex === questions.length - 1 ? t('game.finish') : t('game.next')}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
