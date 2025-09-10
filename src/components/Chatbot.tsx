
// import { useState } from 'react';
// import { MessageCircle, X, Send, Bot } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { useLanguage } from '@/contexts/LanguageContext';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const { language, translate } = useLanguage();
//   const [chatHistory, setChatHistory] = useState<{type: 'user' | 'bot', content: string}[]>([
//     {
//       type: 'bot', 
//       content: translate(
//         'Hello! I\'m Saheli Assistant. How can I help you today with financial advice, government schemes, or entrepreneurship questions?',
//         'नमस्ते! मैं सहेली असिस्टेंट हूँ। आज मैं आपकी वित्तीय सलाह, सरकारी योजनाओं, या उद्यमिता प्रश्नों के साथ कैसे मदद कर सकती हूँ?'
//       )
//     }
//   ]);
//   const { toast } = useToast();

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     // Add user message to chat history
//     setChatHistory([...chatHistory, {type: 'user', content: message}]);
    
//     // Simulate bot response (in a real app, this would call an API)
//     setTimeout(() => {
//       let responseEn = '';
//       let responseHi = '';
      
//       if (message.toLowerCase().includes('scheme') || message.toLowerCase().includes('government') || 
//           message.toLowerCase().includes('योजना') || message.toLowerCase().includes('सरकार')) {
//         responseEn = 'We have several government schemes like Pradhan Mantri Mahila Shakti Yojana and Mahila Udyam Nidhi Scheme. You can explore them in the Government Schemes section!';
//         responseHi = 'हमारे पास प्रधानमंत्री महिला शक्ति योजना और महिला उद्यम निधि योजना जैसी कई सरकारी योजनाएं हैं। आप इन्हें सरकारी योजनाएं अनुभाग में देख सकते हैं!';
//       } else if (message.toLowerCase().includes('loan') || message.toLowerCase().includes('finance') ||
//                 message.toLowerCase().includes('ऋण') || message.toLowerCase().includes('वित्त')) {
//         responseEn = 'Saheli offers information about various financial products and loans designed specifically for women entrepreneurs. Check our Resources section!';
//         responseHi = 'सहेली विशेष रूप से महिला उद्यमियों के लिए डिज़ाइन किए गए विभिन्न वित्तीय उत्पादों और ऋणों के बारे में जानकारी प्रदान करती है। हमारे संसाधन अनुभाग की जांच करें!';
//       } else if (message.toLowerCase().includes('business') || message.toLowerCase().includes('entrepreneur') ||
//                 message.toLowerCase().includes('व्यापार') || message.toLowerCase().includes('उद्यमी')) {
//         responseEn = 'Looking to start a business? Our Entrepreneurship section has resources, success stories, and a marketplace for women entrepreneurs.';
//         responseHi = 'क्या आप व्यापार शुरू करने की सोच रहे हैं? हमारे उद्यमिता अनुभाग में महिला उद्यमियों के लिए संसाधन, सफलता की कहानियां और एक बाज़ार है।';
//       } else {
//         responseEn = 'Thank you for your message. How else can I assist you with women\'s empowerment and financial independence?';
//         responseHi = 'आपके संदेश के लिए धन्यवाद। मैं महिला सशक्तिकरण और वित्तीय स्वतंत्रता के साथ आपकी किस अन्य तरीके से सहायता कर सकती हूँ?';
//       }
      
//       setChatHistory(prev => [...prev, {type: 'bot', content: translate(responseEn, responseHi)}]);
//     }, 1000);
    
//     // Clear input field
//     setMessage('');
//   };

//   return (
//     <>
//       {/* Chatbot Toggle Button */}
//       <Button 
//         onClick={toggleChatbot}
//         className="fixed bottom-5 right-5 rounded-full p-4 bg-saheli-purple shadow-lg hover:bg-saheli-purple/90 z-50"
//         size="icon"
//       >
//         {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//       </Button>
      
//       {/* Chatbot Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-5 w-80 sm:w-96 bg-card rounded-xl shadow-xl z-50 border border-white/10 overflow-hidden animate-scale-in">
//           {/* Header */}
//           <div className="bg-saheli-purple p-4 flex items-center gap-2">
//             <Bot className="h-6 w-6 text-white" />
//             <h3 className="text-white font-medium">
//               {language === 'en' ? 'Saheli Assistant' : 'सहेली असिस्टेंट'}
//             </h3>
//           </div>
          
//           {/* Chat Messages */}
//           <div className="p-4 h-80 overflow-y-auto bg-saheli-deep/80 backdrop-blur-sm">
//             {chatHistory.map((chat, index) => (
//               <div 
//                 key={index} 
//                 className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}
//               >
//                 <div className={`inline-block max-w-[85%] rounded-lg px-4 py-2 ${
//                   chat.type === 'user' 
//                     ? 'bg-saheli-purple text-white rounded-tr-none' 
//                     : 'bg-white/10 backdrop-blur-sm text-white rounded-tl-none'
//                 }`}>
//                   {chat.content}
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Input */}
//           <form onSubmit={handleSendMessage} className="border-t border-white/10 p-4 flex gap-2">
//             <Input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder={language === 'en' ? "Type your message..." : "अपना संदेश टाइप करें..."}
//               className="flex-grow bg-white/10 text-white placeholder:text-white/50 border-white/20"
//             />
//             <Button 
//               type="submit" 
//               className="bg-saheli-purple hover:bg-saheli-purple/90"
//               size="icon"
//             >
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;


import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import "../App.css"; // Import the CSS file

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="chatbot-toggle-btn">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot Iframe */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            AI Chatbot
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <iframe
            className="chatbot-iframe"
            src="https://www.chatbase.co/chatbot-iframe/33UFv2FkMq_ue0vczReLy"
            title="AI Chatbot"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;