package com.juan.performanceApp.pomodoro.infrastructure.config;


import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.PomodoroRepositoryI;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.PomodoroRepositoryImpl;
import com.juan.performanceApp.pomodoro.repository.PomodoroRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

//@Configuration
//public final class PomodoroConfig {
////
////    @Bean
////    public PomodoroRepositoryI findAllPomodoroRepository (){
////        return new PomodoroRepositoryImpl() {};
////
////    }
//}
