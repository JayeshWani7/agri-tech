'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane as Plant, Wheat, Sprout, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const cropStories = {
  wheat: {
    en: [
      {
        title: "The Golden Beginning",
        content: "As the autumn winds sweep across the fields, farmers prepare their land for wheat planting. The soil, rich and dark, holds the promise of golden harvests to come. This ancient grain has fed civilizations for over 10,000 years.",
        tip: "Choose well-draining soil with pH between 6.0-7.0 for optimal growth."
      },
      {
        title: "Seeds of Hope",
        content: "Each tiny wheat seed contains the potential for hundreds of grains. When planted, these seeds begin their journey in the cool autumn soil, developing strong roots before winter arrives.",
        tip: "Plant seeds 1-2 inches deep and 1 inch apart in rows."
      },
      {
        title: "Winter's Embrace",
        content: "Through the cold winter months, young wheat plants undergo vernalization - a crucial period of cold that triggers future flowering. Under the snow, the wheat dreams of spring.",
        tip: "Winter wheat needs 30-60 days of cold temperatures below 40°F (4°C)."
      },
      {
        title: "Spring Revival",
        content: "As temperatures rise, wheat plants shoot upward, reaching for the sun. The fields transform from brown to vibrant green, a testament to nature's resilience.",
        tip: "Apply nitrogen fertilizer as plants begin spring growth."
      },
      {
        title: "The Dancing Heads",
        content: "By late spring, wheat heads emerge, dancing in the breeze. Each head contains dozens of potential grains, swaying like nature's wind chimes.",
        tip: "Watch for diseases like rust during this crucial period."
      },
      {
        title: "Green to Gold",
        content: "Summer brings the magical transformation as green heads turn to gold. The wheat begins its final maturation, each grain filling with nutrients.",
        tip: "Monitor moisture levels to prevent sprouting in the head."
      },
      {
        title: "Harvest Time",
        content: "The moment of truth arrives as combines roll through golden fields. The satisfying thrum of machinery marks the culmination of months of care and patience.",
        tip: "Harvest when grain moisture content is below 14%."
      },
      {
        title: "Nature's Bounty",
        content: "Each acre of wheat can produce enough flour for 2,000 loaves of bread. The harvest represents not just food, but the connection between earth, farmer, and community.",
        tip: "Proper storage is crucial - keep grain cool and dry."
      },
      {
        title: "The Cycle Continues",
        content: "As trucks carry away the golden grain, farmers already plan for the next season. The eternal cycle of planting and harvest continues, feeding the world.",
        tip: "Rotate crops to maintain soil health."
      },
      {
        title: "A Global Story",
        content: "From ancient Mesopotamia to modern farms, wheat connects us all. It's a story of human innovation, perseverance, and the eternal partnership between farmers and the land.",
        tip: "Learn from local farming communities and share knowledge."
      }
    ],
    hi: [
      {
        title: "सुनहरी शुरुआत",
        content: "जैसे ही पतझड़ की हवाएं खेतों में बहती हैं, किसान गेहूं की बुवाई के लिए अपनी जमीन तैयार करते हैं। उपजाऊ और गहरी मिट्टी में सुनहरी फसल का वादा छिपा होता है। यह प्राचीन अनाज 10,000 वर्षों से सभ्यताओं को पोषण दे रहा है।",
        tip: "उत्तम वृद्धि के लिए pH 6.0-7.0 के बीच अच्छी जल निकासी वाली मिट्टी चुनें।"
      },
      {
        title: "आशा के बीज",
        content: "प्रत्येक छोटे गेहूं के बीज में सैकड़ों दानों की संभावना छिपी होती है। बोए जाने पर, ये बीज ठंडी शरद ऋतु की मिट्टी में अपनी यात्रा शुरू करते हैं।",
        tip: "बीजों को 1-2 इंच गहराई पर और पंक्तियों में 1 इंच की दूरी पर बोएं।"
      },
      {
        title: "सर्दी का आलिंगन",
        content: "ठंड के महीनों में, युवा गेहूं के पौधे वर्नलाइजेशन से गुजरते हैं - एक महत्वपूर्ण ठंड की अवधि जो भविष्य में फूलने को प्रेरित करती है।",
        tip: "सर्दी के गेहूं को 40°F (4°C) से नीचे के तापमान में 30-60 दिनों की आवश्यकता होती है।"
      },
      {
        title: "वसंत का पुनर्जीवन",
        content: "तापमान बढ़ने के साथ, गेहूं के पौधे सूर्य की ओर बढ़ते हैं। खेत भूरे से हरे में बदल जाते हैं, प्रकृति की लचीलेपन का प्रमाण।",
        tip: "पौधों की वसंत वृद्धि शुरू होने पर नाइट्रोजन उर्वरक लगाएं।"
      },
      {
        title: "नृत्य करते सिर",
        content: "देर वसंत तक, गेहूं के सिर निकलते हैं, हवा में नाचते हुए। प्रत्येक सिर में दर्जनों संभावित दाने होते हैं।",
        tip: "इस महत्वपूर्ण अवधि के दौरान रस्ट जैसी बीमारियों पर नज़र रखें।"
      },
      {
        title: "हरे से सोना",
        content: "गर्मियों में जादुई परिवर्तन होता है जब हरे सिर सोने में बदल जाते हैं। गेहूं अपना अंतिम परिपक्वता शुरू करता है।",
        tip: "सिर में अंकुरण को रोकने के लिए नमी के स्तर की निगरानी करें।"
      },
      {
        title: "कटाई का समय",
        content: "सुनहरे खेतों में कंबाइन के साथ सच का क्षण आता है। मशीनरी की संतोषजनक आवाज महीनों की देखभाल का परिणाम है।",
        tip: "कटाई तब करें जब अनाज की नमी 14% से कम हो।"
      },
      {
        title: "प्रकृति का वरदान",
        content: "गेहूं का प्रत्येक एकड़ 2,000 रोटियों के लिए पर्याप्त आटा उत्पन्न कर सकता है। फसल न केवल भोजन का प्रतीक है, बल्कि धरती, किसान और समुदाय के बीच संबंध है।",
        tip: "उचित भंडारण महत्वपूर्ण है - अनाज को ठंडा और सूखा रखें।"
      },
      {
        title: "चक्र जारी है",
        content: "जैसे ही ट्रक सुनहरे अनाज को ले जाते हैं, किसान अगले मौसम की योजना बनाते हैं। बुवाई और कटाई का शाश्वत चक्र जारी रहता है।",
        tip: "मिट्टी की सेहत बनाए रखने के लिए फसल चक्र अपनाएं।"
      },
      {
        title: "एक वैश्विक कहानी",
        content: "प्राचीन मेसोपोटामिया से लेकर आधुनिक खेतों तक, गेहूं हम सभी को जोड़ता है। यह मानव नवाचार, दृढ़ता और किसानों और भूमि के बीच शाश्वत साझेदारी की कहानी है।",
        tip: "स्थानीय कृषि समुदायों से सीखें और ज्ञान साझा करें।"
      }
    ]
  },
  rice: {
    en: [
      {
        title: "The Water's Gift",
        content: "Rice begins its journey in standing water, a crop born from the marriage of earth and water. For millennia, it has been the cornerstone of Asian civilization.",
        tip: "Maintain water depth at 2-3 inches during initial growth."
      },
      {
        title: "Nursery Days",
        content: "In the nursery, tiny rice seedlings emerge like green jewels. Each one holds the potential to produce hundreds of grains, a miracle of nature's abundance.",
        tip: "Keep nursery temperature between 25-30°C for optimal germination."
      },
      {
        title: "Transplanting Dance",
        content: "The art of transplanting is a delicate dance, as farmers carefully place each seedling in the puddled field. It's a practice passed down through generations.",
        tip: "Space plants 6-8 inches apart for best results."
      },
      {
        title: "Growing Strong",
        content: "Through the warm months, rice plants grow tall and strong. The fields become a sea of green, swaying in the monsoon winds.",
        tip: "Monitor nitrogen levels during the vegetative stage."
      },
      {
        title: "The Flowering Phase",
        content: "As flowers emerge, the rice field takes on a golden hue. Each plant prepares to create the grains that will feed millions.",
        tip: "Maintain consistent water levels during flowering."
      },
      {
        title: "Grain Formation",
        content: "The magic of grain filling begins, as each flower transforms into a precious grain of rice. The plants bow with the weight of their gift.",
        tip: "Protect from birds during grain formation."
      },
      {
        title: "Ripening Time",
        content: "The green grains slowly turn golden, signaling their readiness. The field becomes a canvas of gold, ready for harvest.",
        tip: "Check grain moisture content regularly."
      },
      {
        title: "Harvest Festival",
        content: "Harvest time is a celebration of life and abundance. Communities come together to bring in the crop that sustains them.",
        tip: "Harvest when 80-85% of grains are golden."
      },
      {
        title: "Post-Harvest Care",
        content: "After harvest, the grains need careful drying and storage. Each grain is precious and must be preserved properly.",
        tip: "Dry rice to 14% moisture content for storage."
      },
      {
        title: "The Circle Complete",
        content: "As the season ends, farmers prepare for the next cycle. Rice farming is a continuous story of dedication and hope.",
        tip: "Plan crop rotation for soil health."
      }
    ],
    hi: [
      {
        title: "जल का वरदान",
        content: "धान की शुरुआत खड़े पानी में होती है, यह फसल धरती और जल के मिलन से जन्मी है। सहस्राब्दियों से, यह एशियाई सभ्यता का आधार रहा है।",
        tip: "प्रारंभिक विकास के दौरान पानी की गहराई 2-3 इंच बनाए रखें।"
      },
      {
        title: "नर्सरी के दिन",
        content: "नर्सरी में, छोटे धान के पौधे हरे रत्नों की तरह उभरते हैं। प्रत्येक में सैकड़ों दानों के उत्पादन की क्षमता होती है।",
        tip: "सर्वोत्तम अंकुरण के लिए नर्सरी का तापमान 25-30°C के बीच रखें।"
      },
      {
        title: "रोपाई का नृत्य",
        content: "रोपाई की कला एक नाजुक नृत्य है, जैसे किसान सावधानी से प्रत्येक पौधे को कीचड़ वाले खेत में लगाते हैं।",
        tip: "सर्वोत्तम परिणामों के लिए पौधों को 6-8 इंच की दूरी पर लगाएं।"
      },
      {
        title: "मजबूत विकास",
        content: "गर्म महीनों में, धान के पौधे लंबे और मजबूत होते हैं। खेत हरे सागर में बदल जाते हैं, मानसून की हवाओं में झूमते हुए।",
        tip: "वानस्पतिक चरण के दौरान नाइट्रोजन स्तरों की निगरानी करें।"
      },
      {
        title: "फूलने का चरण",
        content: "जैसे फूल निकलते हैं, धान का खेत सुनहरा हो जाता है। प्रत्येक पौधा लाखों को खिलाने वाले दाने बनाने की तैयारी करता है।",
        tip: "फूलने के दौरान पानी का स्तर स्थिर रखें।"
      },
      {
        title: "दाना बनना",
        content: "दाना भरने का जादू शुरू होता है, जैसे हर फूल कीमती धान के दाने में बदलता है। पौधे अपने उपहार के भार से झुक जाते हैं।",
        tip: "दाना बनने के दौरान पक्षियों से बचाएं।"
      },
      {
        title: "पकने का समय",
        content: "हरे दाने धीरे-धीरे सुनहरे हो जाते हैं, अपनी तैयारी का संकेत देते हुए। खेत सोने का कैनवास बन जाता है।",
        tip: "दानों की नमी की नियमित जांच करें।"
      },
      {
        title: "कटाई का उत्सव",
        content: "कटाई का समय जीवन और समृद्धि का उत्सव है। समुदाय फसल काटने के लिए एकजुट होते हैं।",
        tip: "कटाई तब करें जब 80-85% दाने सुनहरे हों।"
      },
      {
        title: "कटाई के बाद देखभाल",
        content: "कटाई के बाद, दानों को सावधानी से सुखाने और भंडारण की आवश्यकता होती है। हर दाना कीमती है।",
        tip: "भंडारण के लिए चावल को 14% नमी तक सुखाएं।"
      },
      {
        title: "चक्र पूरा",
        content: "मौसम समाप्त होने पर, किसान अगले चक्र की तैयारी करते हैं। धान की खेती समर्पण और आशा की निरंतर कहानी है।",
        tip: "मिट्टी की सेहत के लिए फसल चक्र की योजना बनाएं।"
      }
    ]
  },
  jowar: {
    en: [
      {
        title: "The Hardy Pioneer",
        content: "Jowar, or sorghum, is nature's answer to harsh conditions. This resilient crop has sustained communities in the world's toughest growing regions.",
        tip: "Choose well-draining soil with pH 6.0-7.0."
      },
      {
        title: "Planting Hope",
        content: "As the soil warms, jowar seeds are planted with hope. Each seed carries the strength to withstand drought and heat.",
        tip: "Plant when soil temperature reaches 18°C (65°F)."
      },
      {
        title: "Early Growth",
        content: "Young jowar plants grow slowly at first, developing deep roots that will be their lifeline in dry times.",
        tip: "Maintain weed-free conditions during early growth."
      },
      {
        title: "The Growth Spurt",
        content: "Once established, jowar grows rapidly, reaching for the sky. Its thick stalks stand proud against wind and weather.",
        tip: "Apply nitrogen fertilizer during rapid growth phase."
      },
      {
        title: "Flowering Time",
        content: "The emergence of flowers marks a crucial phase. Each head will produce hundreds of nutritious grains.",
        tip: "Watch for bird damage during flowering."
      },
      {
        title: "Grain Development",
        content: "As grains develop, the plants stand tall like sentinels in the field. Each head becomes heavy with promise.",
        tip: "Monitor for pest infestations regularly."
      },
      {
        title: "Color Change",
        content: "The transformation begins as green heads turn to rich brown or red. Each variety has its unique hue.",
        tip: "Check grain moisture content regularly."
      },
      {
        title: "Harvest Approaches",
        content: "The field takes on a golden-brown hue, signaling harvest time. The sturdy crop stands ready.",
        tip: "Harvest when grain moisture is 12-14%."
      },
      {
        title: "Multiple Uses",
        content: "Jowar isn't just food - its stalks provide fodder, fuel, and building material. Nothing goes to waste.",
        tip: "Store stalks properly for animal feed."
      },
      {
        title: "Future Promise",
        content: "As climate changes challenge agriculture, jowar's resilience becomes more valuable. It's a crop for the future.",
        tip: "Save best seeds for next season."
      }
    ],
    hi: [
      {
        title: "मजबूत अग्रदूत",
        content: "ज्वार प्रकृति का कठोर परिस्थितियों का जवाब है। इस लचीली फसल ने दुनिया के सबसे कठिन क्षेत्रों में समुदायों को जीवित रखा है।",
        tip: "pH 6.0-7.0 के साथ अच्छी जल निकासी वाली मिट्टी चुनें।"
      },
      {
        title: "आशा का रोपण",
        content: "जैसे ही मिट्टी गर्म होती है, ज्वार के बीज आशा के साथ बोए जाते हैं। प्रत्येक बीज में सूखे और गर्मी का सामना करने की ताकत होती है।",
        tip: "मिट्टी का तापमान 18°C (65°F) होने पर बोएं।"
      },
      {
        title: "प्रारंभिक विकास",
        content: "युवा ज्वार के पौधे शुरू में धीरे-धीरे बढ़ते हैं, गहरी जड़ें विकसित करते हैं जो सूखे समय में उनकी जीवन रेखा होंगी।",
        tip: "प्रारंभिक विकास के दौरान खरपतवार मुक्त स्थिति बनाए रखें।"
      },
      {
        title: "तेज विकास",
        content: "एक बार स्थापित होने के बाद, ज्वार तेजी से बढ़ता है, आसमान की ओर बढ़ता है। इसके मोटे तने हवा और मौसम का सामना करते हैं।",
        tip: "तेज विकास चरण के दौरान नाइट्रोजन उर्वरक लगाएं।"
      },
      {
        title: "फूलने का समय",
        content: "फूलों का निकलना एक महत्वपूर्ण चरण है। प्रत्येक सिर सैकड़ों पौष्टिक दाने पैदा करेगा।",
        tip: "फूलने के दौरान पक्षियों से नुकसान की निगरानी करें।"
      },
      {
        title: "दाना विकास",
        content: "जैसे दाने विकसित होते हैं, पौधे खेत में प्रहरी की तरह खड़े रहते हैं। प्रत्येक सिर वादे से भारी हो जाता है।",
        tip: "कीट संक्रमण की नियमित निगरानी करें।"
      },
      {
        title: "रंग परिवर्तन",
        content: "हरे सिर गहरे भूरे या लाल रंग में बदलने के साथ परिवर्तन शुरू होता है। प्रत्येक किस्म का अपना अनूठा रंग होता है।",
        tip: "दानों की नमी की नियमित जांच करें।"
      },
      {
        title: "कटाई का समय",
        content: "खेत सुनहरा-भूरा हो जाता है, कटाई का समय संकेत करता है। मजबूत फसल तैयार खड़ी है।",
        tip: "दानों की नमी 12-14% होने पर कटाई करें।"
      },
      {
        title: "बहुउपयोगी",
        content: "ज्वार सिर्फ भोजन नहीं है - इसके तने चारा, ईंधन और निर्माण सामग्री प्रदान करते हैं। कुछ भी बर्बाद नहीं होता।",
        tip: "पशु चारे के लिए तनों को सही तरीके से संग्रहित करें।"
      },
      {
        title: "भविष्य का वादा",
        content: "जैसे जलवायु परिवर्तन कृषि को चुनौती देता है, ज्वार की लचीलापन और भी मूल्यवान हो जाता है। यह भविष्य की फसल है।",
        tip: "अगले मौसम के लिए सर्वश्रेष्ठ बीज बचाएं।"
      }
    ]
  }
};

export default function Home() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsPlaying(false);
          toast({
            title: "Error",
            description: "An error occurred during speech synthesis.",
            variant: "destructive"
          });
        };
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      } else {
        toast({
          title: "Error",
          description: "Speech synthesis is not supported in your browser.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
      toast({
        title: "Error",
        description: "An error occurred while initializing speech synthesis.",
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };

  const nextCard = () => {
    if (selectedCrop && currentCard < cropStories[selectedCrop][language].length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-100 mb-4">
            Farmer's Crop Guide
          </h1>
          <p className="text-lg text-green-600 dark:text-green-200">
            Select a crop to learn its story
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue={language} onValueChange={setLanguage}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="hi">हिंदी</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20"
            onClick={() => {
              setSelectedCrop('wheat');
              setCurrentCard(0);
            }}
          >
            <div className="flex flex-col items-center">
              <Wheat className="w-12 h-12 text-amber-500 mb-4" />
              <h2 className="text-xl font-semibold">Wheat</h2>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20"
            onClick={() => {
              setSelectedCrop('rice');
              setCurrentCard(0);
            }}
          >
            <div className="flex flex-col items-center">
              <Plant className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold">Rice</h2>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20"
            onClick={() => {
              setSelectedCrop('jowar');
              setCurrentCard(0);
            }}
          >
            <div className="flex flex-col items-center">
              <Sprout className="w-12 h-12 text-brown-500 mb-4" />
              <h2 className="text-xl font-semibold">Jowar</h2>
            </div>
          </Card>
        </div>

        {selectedCrop && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">{cropStories[selectedCrop][language][currentCard].title}</h3>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => isPlaying ? stopSpeaking() : speak(
                    `${cropStories[selectedCrop][language][currentCard].title}. ${cropStories[selectedCrop][language][currentCard].content}. ${cropStories[selectedCrop][language][currentCard].tip}`
                  )}
                >
                  {isPlaying ? '⏹️' : '🔊'}
                </Button>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{cropStories[selectedCrop][language][currentCard].content}</p>
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    💡 Tip: {cropStories[selectedCrop][language][currentCard].tip}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={prevCard}
                  disabled={currentCard === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentCard + 1} of {cropStories[selectedCrop][language].length}
                </span>
                <Button
                  variant="outline"
                  onClick={nextCard}
                  disabled={currentCard === cropStories[selectedCrop][language].length - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}