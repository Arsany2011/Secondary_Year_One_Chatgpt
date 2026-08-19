import { useEffect, useMemo, useState } from "react";

import motivationMessages from "../data/motivationMessages";

const STORAGE_KEY = "secondary_year_one_motivation";

function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);

  const difference =
    date.getTime() - startOfYear.getTime();

  return Math.floor(
    difference / (7 * 24 * 60 * 60 * 1000),
  );
}

function getWeekIndex(date) {
  return getWeekNumber(date) % 4;
}

function getDayIndex(date) {
  return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

function getStorageData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        weekKey: "",
        messageIndex: -1,
      };
    }

    return JSON.parse(saved);
  } catch {
    return {
      weekKey: "",
      messageIndex: -1,
    };
  }
}

function getWeekKey(date) {
  const year = date.getFullYear();
  const week = getWeekNumber(date);

  return `${year}-week-${week}`;
}

function getInitialMessage(date) {
  const weekKey = getWeekKey(date);
  const saved = getStorageData();

  const weekNames = ["week1", "week2", "week3", "week4"];

  const weekName =
    weekNames[getWeekIndex(date)];

  const messages = motivationMessages[weekName];

  let nextIndex;

  if (saved.weekKey !== weekKey) {
    nextIndex = 0;
  } else {
    nextIndex =
      (saved.messageIndex + 1) % messages.length;
  }

  const updated = {
    weekKey,
    messageIndex: nextIndex,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );

  return messages[nextIndex];
}

function useMotivation() {
  const [message] = useState(() =>
    getInitialMessage(new Date()),
  );

  const [currentDate] = useState(() => new Date());

  const weekName = useMemo(() => {
    const names = ["week1", "week2", "week3", "week4"];

    return names[getWeekIndex(currentDate)];
  }, [currentDate]);

  const dayIndex = getDayIndex(currentDate);

  const isFriday = dayIndex === 4;

  const greeting = useMemo(() => {
    const hour = currentDate.getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  }, [currentDate]);

  useEffect(() => {
    document.title = `${message.title} · Secondary Year One`;
  }, [message.title]);

  return {
    message,
    currentDate,
    weekName,
    dayIndex,
    isFriday,
    greeting,
  };
}

export default useMotivation;