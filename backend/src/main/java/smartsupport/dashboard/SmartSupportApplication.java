package smartsupport.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// We need to tell Spring to scan other packages for components like controllers and services
@ComponentScan(basePackages = "smartsupport")
public class SmartSupportApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartSupportApplication.class, args);
	}

}
