// utils/percentValidation.ts

export type PercentEntry = {
  section: "first" | "mid" | "last";
  index: number;
  value: number | null;
};

export type PercentErrorMap = {
  first: boolean;
  mid: boolean[];
  last: boolean;
};

type PercentType = { percent: number | null }[];

const toNum = (v: unknown) => (v !== null && v !== undefined && v !== "") ? Number(v) : null;

export function getPercentSequence(items: {
  first: PercentType;
  mid: PercentType;
  last: PercentType;
}): PercentEntry[] {
  return [
    { section: "first", index: 0, value: toNum(items.first[0]?.percent) },
    ...items.mid.map((item, i) => ({ section: "mid" as const, index: i, value: toNum(item.percent) })),
    { section: "last", index: 0, value: toNum(items.last[0]?.percent) },
  ];
}

export function validatePercentOrder(entries: PercentEntry[]): PercentErrorMap {
  const midLen = entries.length - 2;
  const errorFlags: boolean[] = Array(entries.length).fill(false);

  for (let i = 1; i < entries.length; i++) {
    const prev = entries[i - 1].value;
    const cur = entries[i].value;

    if (prev === null || cur === null) continue;

    if (Number(cur) <= Number(prev)) {
      errorFlags[i] = true;
    }
  }

  return {
    first: errorFlags[0],
    mid: errorFlags.slice(1, 1 + midLen),
    last: errorFlags[errorFlags.length - 1],
  };
}