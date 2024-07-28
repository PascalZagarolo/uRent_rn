import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/~/components/ui/accordion";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { useRef, useState } from "react";
import { businessFaqs } from "@/db/schema";
import { FontAwesome } from "@expo/vector-icons";
import exp from "constants";

interface ProfileFaqsProps {
    thisQuestions : typeof businessFaqs.$inferSelect[];
}


const ProfileFaqs : React.FC<ProfileFaqsProps> = ({
    thisQuestions
}) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const animations = useRef([]).current;

    const faqs = [
        {
            question: 'What is your return policy?',
            answer: 'Our return policy is 30 days with a receipt.',
        },
        {
            question: 'How do I track my order?',
            answer: 'You can track your order through the tracking link sent to your email.',
        },
        {
            question: 'Can I purchase items online?',
            answer: 'Yes, you can purchase items directly from our website.',
        },
    ];

    if (!animations.length) {
        faqs.forEach(() => {
            animations.push(new Animated.Value(0));
        });
    }

    const handlePress = (index) => {
        if (expandedIndex === index) {
            Animated.timing(animations[index], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                setExpandedIndex(null);
            });
        } else {
            if (expandedIndex !== null) {
                Animated.timing(animations[expandedIndex], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
            Animated.timing(animations[index], {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
            setExpandedIndex(index);
        }
    };

    return (
        <View className="p-4">
            <View>
                <Text className="text-lg font-semibold text-gray-200">
                    FAQs
                </Text>
            </View>
            {thisQuestions.map((faq, index) => (
                <View key={index} className="mt-4">
                    <TouchableOpacity onPress={() => handlePress(index)} className="flex flex-row items-center border-b border-gray-800 pb-2">
                        <Text className="text-base font-medium text-gray-200 w-11/12">
                            {faq.question}  
                            
                        </Text>
                        <View className="w-1/12 ml-2">
                        {expandedIndex === index ? (
                            <FontAwesome className="" name="chevron-up" size={16} color="white" />
                        ) : (
                            <FontAwesome className="" name="chevron-down" size={16} color="white" />
                        )}
                        </View>
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <Animated.View style={{ height: animations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 100] // Adjust this value to fit your content height
                        }) }} className="mt-2">
                            <Text className="text-sm text-gray-400">
                                {faq.answer}
                            </Text>
                        </Animated.View>
                    )}
                </View>
            ))}
        </View>
    );
}

export default ProfileFaqs;