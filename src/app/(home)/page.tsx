"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("rendred");
  }, []);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">I am a button</Button>
        </div>
        <div>
          <Input placeholder="I am an input" ></Input>
        </div>
        <div>
          <Progress value={50} />
        </div>

        <div>
          <Textarea placeholder="I am a text area" />
        </div>

      </div>
      <Checkbox></Checkbox>
    </div>
  );
}
