import pygame
import random

# Initialize Pygame
pygame.init()

# Game Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
SPY_SIZE = 40
ENEMY_SIZE = 40
CLUE_SIZE = 20

# Screen setup
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Spy Game")

# Spy class
class Spy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((SPY_SIZE, SPY_SIZE))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
        self.speed = 5

    def update(self, keys):
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT] and self.rect.right < SCREEN_WIDTH:
            self.rect.x += self.speed
        if keys[pygame.K_UP] and self.rect.top > 0:
            self.rect.y -= self.speed
        if keys[pygame.K_DOWN] and self.rect.bottom < SCREEN_HEIGHT:
            self.rect.y += self.speed

# Enemy class
class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((ENEMY_SIZE, ENEMY_SIZE))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, SCREEN_WIDTH - ENEMY_SIZE)
        self.rect.y = random.randint(0, SCREEN_HEIGHT - ENEMY_SIZE)
        self.speed = random.randint(2, 4)

    def update(self):
        self.rect.x += self.speed
        if self.rect.left > SCREEN_WIDTH or self.rect.right < 0:
            self.rect.x = random.randint(0, SCREEN_WIDTH - ENEMY_SIZE)

# Clue class
class Clue(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((CLUE_SIZE, CLUE_SIZE))
        self.image.fill(BLACK)
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, SCREEN_WIDTH - CLUE_SIZE)
        self.rect.y = random.randint(0, SCREEN_HEIGHT - CLUE_SIZE)

# Game Setup
spy = Spy()
enemies = pygame.sprite.Group()
for _ in range(5):
    enemy = Enemy()
    enemies.add(enemy)

clues = pygame.sprite.Group()
for _ in range(3):
    clue = Clue()
    clues.add(clue)

all_sprites = pygame.sprite.Group()
all_sprites.add(spy)
all_sprites.add(enemies)
all_sprites.add(clues)

# Game Loop
clock = pygame.time.Clock()
score = 0
font = pygame.font.SysFont(None, 36)

def draw_text(text, x, y):
    text_surface = font.render(text, True, WHITE)
    screen.blit(text_surface, (x, y))

running = True
while running:
    screen.fill((0, 0, 0))  # Background color
    keys = pygame.key.get_pressed()

    # Update spy and enemies
    spy.update(keys)
    enemies.update()

    # Collision detection
    if pygame.sprite.spritecollide(spy, enemies, False):
        draw_text("Game Over! You were caught!", 250, 250)
        pygame.display.update()
        pygame.time.delay(2000)
        running = False

    # Collect clues
    collected_clues = pygame.sprite.spritecollide(spy, clues, True)
    score += len(collected_clues)

    # Draw everything
    all_sprites.draw(screen)
    draw_text(f"Clues collected: {score}", 10, 10)

    pygame.display.update()

    # Set the frame rate
    clock.tick(30)

    # Quit event
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

pygame.quit()
