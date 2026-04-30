export type PollKind = 'breakdown' | 'lens';

export const polls: Record<PollKind, { question: string; options: string[] }> = {
  breakdown: {
    question: 'Where do public services most often break down?',
    options: ['knowing where to start','understanding what applies to me','repeated forms or duplication','unclear next steps','handoffs between teams','confusing language','systems that do not connect','something else']
  },
  lens: {
    question: 'Which design lens do you already use, even if you do not call it that?',
    options: ['clarifying information','improving processes','connecting teams','solving user problems','prototyping tools','facilitating decisions','visualising complexity','designing change']
  }
};

export type WorkshopSubmission = {
  id: string; team?: string; service: string; tryingToDo: string; friction: string; whereFriction: string; feel: string; hmw: string; idea: string; shared: boolean; createdAt: number;
};

export type Takeaway = { id: string; team?: string; text: string; createdAt: number };
