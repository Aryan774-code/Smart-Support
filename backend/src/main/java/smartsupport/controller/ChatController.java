package smartsupport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import smartsupport.dto.ChatRequest;
import smartsupport.dto.ChatResponse;
import smartsupport.service.GeminiService;

@RestController
@RequestMapping("/api/chat")
// This is VERY important. It allows your Angular app (running on localhost:4200) to call the backend.
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    @Autowired
    private GeminiService geminiService; // <-- CORRECTED: Renamed variable for clarity

    @PostMapping
    public ChatResponse handleChat(@RequestBody ChatRequest chatRequest) {
        // CORRECTED: Using the correctly named variable
        String responseMessage = geminiService.getGeminiResponse(chatRequest.getPrompt());
        return new ChatResponse(responseMessage);
    }
}


