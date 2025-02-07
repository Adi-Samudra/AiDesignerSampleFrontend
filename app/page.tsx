"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("https://backend.adityasamudra369.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setResult("An error occurred. Please try again.")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to the AI Indian Ethnic Outfit Designer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your outfit idea..."
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Generate Outfit
          </Button>
        </div>
      </form>
      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Generated Outfit:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  )
}

