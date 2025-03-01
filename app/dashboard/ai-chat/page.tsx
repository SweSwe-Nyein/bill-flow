"use client";
import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const callGetResponse = async () => {
    setIsLoading(true);
    const temp = [...messages, { role: "user", content: theInput }];
    setMessages(temp);
    setTheInput("");

    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: temp }),
    });

    const data = await response.json();
    const { output } = data;

    setMessages((prevMessages) => [...prevMessages, output]);
    setIsLoading(false);
  };

  const Submit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-0 md:mb-8 text-xl md:text-2xl`}>
        AI Chat
      </h1>
      <div className="flex flex-col items-center justify-between px-0 py-0 md:py-5">
        <div className="flex h-[30rem] w-full flex-col items-center">
          <div className="h-full flex flex-col gap-2 overflow-y-auto py-8 px-0 md:px-3 w-full">
            {messages.map((e, index) => {
              return (
                <div
                  key={index}
                  className={`max-w-[14rem] md:max-w-[40rem] rounded-md px-4 py-3 h-min mb-1 ${
                    e.role === "assistant"
                      ? "self-start  bg-gray-200 text-gray-800"
                      : "self-end  bg-gray-800 text-gray-50"
                  } `}
                >
                  {e.content}
                </div>
              );
            })}
            {isLoading ? (
              <div className="self-start  bg-gray-200 text-gray-800 w-max-[14rem] md:max-w-[40rem] rounded-md px-4 py-3 h-min">
                loading...
              </div>
            ) : (
              ""
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="w-full mt-4 flex items-center justify-between gap-2 md:mt-8 px-0 md:px-3">
            <div className="relative flex flex-1 flex-shrink-0">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                placeholder='...'
                onChange={(e) => {setTheInput(e.target.value)}}
                value={theInput}
                onKeyDown={Submit}
              />
            </div>
            <button
              onClick={callGetResponse}
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span className="hidden md:block">Send</span>{' '}
              <PaperAirplaneIcon className="h-5 md:ml-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
