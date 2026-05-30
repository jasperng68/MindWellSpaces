import { z } from "zod";

// Define template schemas
export const templateResponseSchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.enum(['standard', 'conversation']),
  keywords: z.array(z.string())
});

export type TemplateResponse = z.infer<typeof templateResponseSchema>;

// Standard Q&A templates
export const standardTemplates: TemplateResponse[] = [
  {
    question: "How bothered are you in facing little interest or pleasure in doing things?",
    answer: "I understand this can be challenging. Here are some resources that can help: mindfulness exercises, activity scheduling, and community support groups. These can help you rediscover activities that bring joy and meaning.",
    category: 'standard',
    keywords: ['interest', 'pleasure', 'bothered', 'little interest', 'no pleasure']
  },
  {
    question: "Are you feeling tired or having little energy?",
    answer: "It's common to experience fatigue and low energy. Consider trying regular exercise, maintaining a consistent sleep schedule, and balanced nutrition. There are also support groups and professionals who can help you manage your energy levels.",
    category: 'standard',
    keywords: ['tired', 'energy', 'fatigue', 'exhausted', 'no energy']
  },
  {
    question: "Are you having trouble concentrating on things, such as reading the newspaper or watching television?",
    answer: "Difficulty concentrating is a common challenge. Try breaking tasks into smaller parts, taking regular breaks, and practicing mindfulness. Professional support is available to help develop strategies for improving focus.",
    category: 'standard',
    keywords: ['concentrate', 'focus', 'attention', 'distracted', 'trouble focusing', 'reading', 'watching']
  },
  {
    question: "Are you feeling down, depressed or hopeless?",
    answer: "I hear that you're going through a difficult time. Remember that help is available 24/7. Consider reaching out to professional counselors or support hotlines who can provide immediate assistance and ongoing support.",
    category: 'standard',
    keywords: ['down', 'depressed', 'hopeless', 'sad', 'depression']
  },
  {
    question: "Thoughts that you would be better off dead or on hurting yourself in some way",
    answer: "I'm very concerned about what you're sharing. Please know that your life has value and help is available right now. Contact emergency services immediately at 995 or reach out to the Samaritans of Singapore (24 hours) at 1800-221 4444. You don't have to go through this alone.",
    category: 'standard',
    keywords: ['hurt', 'dead', 'suicide', 'kill', 'die', 'end', 'life', 'better off']
  },
  {
    question: "Do you know the symptoms of depression and how to cope with it?",
    answer: "Understanding depression symptoms is important. Common signs include persistent sadness, loss of interest, changes in sleep/appetite, and difficulty concentrating. Coping strategies include regular exercise, maintaining routines, seeking professional help, and connecting with support groups.",
    category: 'standard',
    keywords: ['symptoms', 'depression', 'cope', 'signs', 'manage']
  },
  {
    question: "Do you need to talk?",
    answer: "I'm here to listen. Sometimes talking about our feelings can help us process them better. Remember, there are also professional counselors and support groups available who can provide the support you need.",
    category: 'standard',
    keywords: ['talk', 'listen', 'share', 'speak', 'tell']
  },
  {
    question: "What can I do to be there for you? And help you feel supported?",
    answer: "Your well-being matters. I can listen without judgment, provide resources for professional support, or help you explore coping strategies. Let me know what kind of support would be most helpful right now.",
    category: 'standard',
    keywords: ['help', 'support', 'there for you', 'need']
  },
  {
    question: "Are you feeling bad about yourself, or that you are a failure, or have let yourself or your family down?",
    answer: "Self-critical thoughts are common but often not accurate. Remember that everyone makes mistakes and faces challenges. Consider talking with a trusted friend or counselor who can offer perspective and help you develop self-compassion practices.",
    category: 'standard',
    keywords: ['bad', 'failure', 'let down', 'disappointing', 'self-worth', 'not good enough']
  },
  {
    question: "Are you having poor appetite or overeating?",
    answer: "Changes in appetite can be connected to our emotional state. Maintaining regular eating patterns and nutritious meals is important. If these changes persist, consider consulting with a healthcare provider who can offer guidance and support.",
    category: 'standard',
    keywords: ['appetite', 'eating', 'food', 'hungry', 'overeating', 'undereating']
  },
  {
    question: "Are you having trouble falling or staying asleep, or sleeping too much?",
    answer: "Sleep disturbances can significantly impact how we feel. Establishing a regular sleep routine, creating a calm bedroom environment, and limiting screen time before bed may help. If sleep problems persist, speaking with a healthcare provider could be beneficial.",
    category: 'standard',
    keywords: ['sleep', 'insomnia', 'tired', 'rest', 'bed', 'awake', 'oversleeping']
  },
  {
    question: "Are you moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
    answer: "Changes in movement and speech can be related to your emotional state. These physical symptoms are important to note. Consider discussing these changes with a healthcare provider who can offer appropriate support and treatment options.",
    category: 'standard',
    keywords: ['slow', 'fast', 'fidgety', 'restless', 'moving', 'speaking', 'physical changes']
  },
  {
    question: "How can I get help for depression or anxiety?",
    answer: "There are several effective options for getting help. Consider speaking with your doctor, contacting a mental health professional, or reaching out to community mental health services. In Singapore, you can also call helplines like the Samaritans of Singapore (1800-221 4444) for immediate support.",
    category: 'standard',
    keywords: ['help', 'therapy', 'counseling', 'professional', 'treatment', 'doctor']
  },
  {
    question: "I'm worried about someone else who seems depressed",
    answer: "Your concern is important. Consider expressing your concerns calmly and without judgment, listening actively, and encouraging them to seek professional help. Offer to assist them in finding resources or even accompanying them to an appointment. Remember that emergency services are available if safety is a concern.",
    category: 'standard',
    keywords: ['worried', 'someone else', 'friend', 'family', 'concerned', 'help others']
  },
  {
    question: "What are some self-care strategies for mental health?",
    answer: "Self-care is essential for mental wellbeing. Consider regular physical activity, maintaining consistent sleep patterns, eating nutritious meals, practicing mindfulness or meditation, connecting with supportive people, setting boundaries, and engaging in activities you enjoy. Remember that self-care looks different for everyone.",
    category: 'standard',
    keywords: ['self-care', 'strategies', 'wellness', 'health', 'maintain', 'routine']
  },
  {
    question: "Are there any specific resources in Singapore for mental health support?",
    answer: "Singapore offers several mental health resources, including the Institute of Mental Health (6389 2222), Samaritans of Singapore (1800-221 4444), Silver Ribbon Singapore (6385 3714), and Community Health Assessment Team (6493 6500/01). There are also various counseling centers and online resources available.",
    category: 'standard',
    keywords: ['singapore', 'resources', 'local', 'services', 'support', 'help']
  }
];

// Conversation starters
export const conversationStarters: TemplateResponse[] = [
  {
    question: "Do you ever feel that you've been affected by feelings of edginess, anxiety or nerves?",
    answer: "Thank you for sharing. Let's explore these feelings together. Many people experience anxiety and nervousness. Would you like to tell me more about when these feelings typically occur?",
    category: 'conversation',
    keywords: ['edgy', 'anxiety', 'nerves', 'nervous', 'anxious']
  },
  {
    question: "Have you experienced an 'attack' of fear, anxiety or panic?",
    answer: "I understand how challenging panic attacks can be. Would you like to talk about what happens during these moments? There are techniques and professional support available to help manage these experiences.",
    category: 'conversation',
    keywords: ['attack', 'panic', 'fear', 'anxiety attack', 'panic attack']
  },
  {
    question: "Have you been feeling less motivated these few days?",
    answer: "It's normal for motivation to fluctuate. Could you tell me more about what you're experiencing? Understanding the cause can help us find ways to rebuild your motivation and energy.",
    category: 'conversation',
    keywords: ['motivated', 'motivation', 'unmotivated', 'lazy', 'no drive']
  },
  {
    question: "Have you experienced a terrible occurrence that has impacted you significantly?",
    answer: "I understand that traumatic experiences can have a deep impact. Would you like to share more about what happened? There are professional trauma counselors and support services available to help you process and heal.",
    category: 'conversation',
    keywords: ['terrible', 'trauma', 'impact', 'experience', 'event']
  },
  {
    question: "Can you tell me about your hopes and dreams for the future?",
    answer: "Your aspirations matter. Let's explore your goals and what steps you might take to work towards them. How have you been feeling about your progress lately?",
    category: 'conversation',
    keywords: ['hopes', 'dreams', 'future', 'goals', 'aspirations']
  },
  {
    question: "Tell me about your sleeping habits",
    answer: "Sleep plays a crucial role in our mental well-being. Have you noticed any changes in your sleep patterns? We can explore strategies to improve your sleep quality if needed.",
    category: 'conversation',
    keywords: ['sleep', 'rest', 'insomnia', 'tired', 'sleeping', 'habits']
  },
  {
    question: "How have you been feeling emotionally lately?",
    answer: "Thank you for opening up about your emotions. Understanding our feelings is an important step. Would you like to share more about what might be contributing to how you've been feeling?",
    category: 'conversation',
    keywords: ['emotions', 'feelings', 'emotional', 'mood', 'lately']
  },
  {
    question: "What activities do you enjoy that help you relax or feel better?",
    answer: "It's wonderful that you're thinking about positive activities. Having enjoyable outlets is important for our wellbeing. Would you like to explore more ways to incorporate these activities into your routine?",
    category: 'conversation',
    keywords: ['activities', 'enjoy', 'relax', 'hobbies', 'feel better', 'fun']
  },
  {
    question: "How have your relationships been with family and friends recently?",
    answer: "Relationships play a significant role in our wellbeing. Thank you for sharing about your connections with others. Would you like to discuss any specific relationships or ways to strengthen your support network?",
    category: 'conversation',
    keywords: ['relationships', 'family', 'friends', 'social', 'connections', 'support']
  },
  {
    question: "Have you noticed any changes in your eating habits?",
    answer: "Our eating patterns can be connected to our emotional state. Changes in appetite or food choices are worth paying attention to. Would you like to talk more about these changes and explore healthy approaches to nutrition?",
    category: 'conversation',
    keywords: ['eating', 'appetite', 'food', 'diet', 'nutrition', 'meals']
  },
  {
    question: "What are some of your strengths that have helped you through difficult times?",
    answer: "Recognizing our personal strengths is powerful. Everyone has unique qualities that can help during challenges. Would you like to explore more ways to build on these strengths in your daily life?",
    category: 'conversation',
    keywords: ['strengths', 'abilities', 'good at', 'positive', 'qualities', 'resilience']
  },
  {
    question: "What types of thoughts have been occupying your mind recently?",
    answer: "Our thought patterns can significantly influence how we feel. Being aware of recurring thoughts is an important step. Would you like to discuss techniques for managing challenging thoughts?",
    category: 'conversation',
    keywords: ['thoughts', 'thinking', 'mind', 'worry', 'rumination', 'overthinking']
  },
  {
    question: "How do you typically cope when you're feeling stressed or overwhelmed?",
    answer: "Everyone develops their own ways of coping with stress. Some strategies may be more helpful than others in the long run. Would you like to explore additional healthy coping mechanisms that might work for you?",
    category: 'conversation',
    keywords: ['cope', 'stress', 'overwhelmed', 'handle', 'manage', 'deal with']
  },
  {
    question: "What gives you a sense of purpose or meaning in your life?",
    answer: "Finding meaning and purpose can be a powerful source of resilience. These sources of meaning are unique to each person. Would you like to explore ways to connect more deeply with what gives your life purpose?",
    category: 'conversation',
    keywords: ['purpose', 'meaning', 'important', 'value', 'significance', 'meaningful']
  }
];

type MatchResult = {
  template: TemplateResponse | undefined;
  score: number;
};

// Helper function to find best matching template
export function findBestMatch(userInput: string): TemplateResponse | undefined {
  const input = userInput.toLowerCase();

  // Search through all templates
  const allTemplates = [...standardTemplates, ...conversationStarters];

  // Find best match based on keyword matches and semantic similarity
  const result = allTemplates.reduce<MatchResult>((best, current) => {
    const matchScore = current.keywords.reduce((score, keyword) => {
      // Check for exact matches
      if (input.includes(keyword.toLowerCase())) {
        return score + 2;
      }
      // Check for partial matches
      if (input.split(' ').some(word => keyword.toLowerCase().includes(word))) {
        return score + 1;
      }
      return score;
    }, 0);

    if (!best.template || matchScore > best.score) {
      return { template: current, score: matchScore };
    }
    return best;
  }, { template: undefined, score: 0 });

  // Only return a match if we have a minimum score
  return result.score > 0 ? result.template : undefined;
}