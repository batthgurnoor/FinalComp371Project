/**
 * Observer Pattern Implementation
 * 
 * This pattern allows objects to notify multiple observers about state changes.
 * The UI components observe game state changes and update accordingly.
 * 
 * @author Danish - Controller & Patterns
 */

export interface Observer {
  update(data: unknown): void
}

export interface Subject {
  subscribe(observer: Observer): void
  unsubscribe(observer: Observer): void
  notify(data: unknown): void
}

/**
 * Base Subject class that manages observer subscriptions and notifications.
 * Used by GameController to notify UI components of state changes.
 */
export class GameSubject implements Subject {
  private observers: Observer[] = []

  subscribe(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify(data: unknown): void {
    this.observers.forEach((observer) => observer.update(data))
  }

  getObserverCount(): number {
    return this.observers.length
  }
}

