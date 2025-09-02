package smartsupport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import smartsupport.dto.GeminiRequest;
import smartsupport.dto.GeminiResponse;

import java.util.List;

@Service
public class GeminiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    // Use the latest flash model for speed and cost-effectiveness
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

    public String getGeminiResponse(String prompt) {
        // Construct the full URL with the API key
        String apiUrl = GEMINI_API_URL + "?key=" + geminiApiKey;

        // Create the request body according to the Gemini API structure
        GeminiRequest.Part part = new GeminiRequest.Part(prompt);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest request = new GeminiRequest(List.of(content));

        // Make the POST request
        GeminiResponse response = restTemplate.postForObject(apiUrl, request, GeminiResponse.class);

        // Safely extract the response text
        if (response != null && response.getCandidates() != null && !response.getCandidates().isEmpty()) {
            GeminiResponse.Candidate candidate = response.getCandidates().get(0);
            if (candidate.getContent() != null && candidate.getContent().getParts() != null && !candidate.getContent().getParts().isEmpty()) {
                return candidate.getContent().getParts().get(0).getText();
            }
        }

        return "Error: Could not get a response from the API.";
    }
}
