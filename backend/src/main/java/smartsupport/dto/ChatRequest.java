package smartsupport.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

// Lombok annotation to automatically create getters, setters, toString, etc.
@Data
@NoArgsConstructor
public class ChatRequest {
    private String prompt;
}
